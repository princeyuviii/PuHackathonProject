const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {google} = require('googleapis');
const dotenv = require('dotenv');
const session = require('express-session');
const userModel = require('./model');
const port = 3000;
dotenv.config();
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using https
}));
app.use(passport.session());
app.use(express.json());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    // scope: ['profile', 'email', 'https://www.googleapis.com/auth/fitness.activity.read','https://www.googleapis.com/auth/fitness.body.read']
    scope:[
        "https://www.googleapis.com/auth/fitness.activity.read",
        "https://www.googleapis.com/auth/fitness.blood_glucose.read",
        "https://www.googleapis.com/auth/fitness.blood_pressure.read",
        "https://www.googleapis.com/auth/fitness.heart_rate.read",
        "https://www.googleapis.com/auth/fitness.body.read",
        "https://www.googleapis.com/auth/fitness.body.read",
        "https://www.googleapis.com/auth/fitness.sleep.read",
        "https://www.googleapis.com/auth/fitness.body.read",
        "https://www.googleapis.com/auth/fitness.reproductive_health.read",
        "https://www.googleapis.com/auth/userinfo.profile",
      ]
  },
  (accessToken, refreshToken, profile, done) => {
    // Save the access token for later use
    profile.accessToken = accessToken;
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(express.json());
let userProfileData;
let isSecondHit = false;

// Routes
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

app.get('/dashboard', (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.send('<h1>Dashboard</h1><a href="/fitness-data">Fetch Fitness Data</a>');
});


app.get('/fitness-data', async (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: req.user.accessToken });
  req.session.tokens = req.user.accessToken;

  const profile = await getUserProfile(oauth2Client);
  // Save user profile data in the session

  req.session.userProfile = profile;
  userProfileData = profile;
  const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

  try {
    const dataSource = await fitness.users.dataSources.list({
      userId: 'me',
      dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
      
    });
const userName = userProfileData.displayName;
    const profilePhoto = userProfileData.profilePhotoUrl;
    const userId = userProfileData.userID;

    

const sevenDaysInMillis = 14 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const startTimeMillis = Date.now() - sevenDaysInMillis; // Start time is 7 days ago
const endTimeMillis = Date.now() + 24 * 60 * 60 * 1000;
const response = await fitness.users.dataset.aggregate({
    userId: "me",
    requestBody: {
      aggregateBy: [
        {
          dataTypeName: "com.google.step_count.delta",
        },
        {
          dataTypeName: "com.google.blood_glucose",
        },
        {
          dataTypeName: "com.google.blood_pressure",
        },
        {
          dataTypeName: "com.google.heart_rate.bpm",
        },
        {
          dataTypeName: "com.google.weight",
        },
        {
          dataTypeName: "com.google.height",
        },
        {
          dataTypeName: "com.google.sleep.segment",
        },
        {
          dataTypeName: "com.google.body.fat.percentage",
        },
        {
          dataTypeName: "com.google.menstruation",
        },
      ],
      bucketByTime: { durationMillis: 86400000 }, // Aggregate data in daily buckets
      startTimeMillis,
      endTimeMillis,
    },
  });
  const fitnessData = response.data.bucket;
  const formattedData = [];

  fitnessData.map((data) => {
    const date = new Date(parseInt(data.startTimeMillis));
    const formattedDate = date.toDateString();

    //console.log("Date:", formattedDate);
    const formattedEntry = {
      date: formattedDate,
      step_count: 0,
      glucose_level: 0,
      blood_pressure: [],
      // low_blood_pressure: 0,
      heart_rate: 0,
      weight: 0,
      height_in_cms: 0,
      sleep_hours: 0,
      body_fat_in_percent: 0,
      menstrual_cycle_start: "",
    };

    const datasetMap = data.dataset;
      datasetMap.map((mydataset) => {
          const point = mydataset.point;
          if (point && point.length > 0) {
              const value = point[0].value;
              switch (mydataset.dataSourceId) {
                  case "derived:com.google.step_count.delta:com.google.android.gms:aggregated":

                      formattedEntry.step_count = value[0]?.intVal || 0;
                      break;
                  case "derived:com.google.blood_glucose.summary:com.google.android.gms:aggregated":
                      // console.log("Blood glucose:",mydataset.point[0]?.value)
                      let glucoseLevel = 0;
                      if (mydataset.point[0]?.value) {
                          if (mydataset.point[0]?.value.length > 0) {
                              const dataArray = mydataset.point[0]?.value;
                              dataArray.map((data) => {
                                  if (data.fpVal) {
                                      glucoseLevel = data.fpVal * 10;
                                  }
                              });
                          }
                      }
                      formattedEntry.glucose_level = glucoseLevel;
                      break;
                  case "derived:com.google.blood_pressure.summary:com.google.android.gms:aggregated":
                      let finalData = [0, 0];
                      if (mydataset.point[0]?.value) {
                          const BParray = mydataset.point[0]?.value;
                          if (BParray.length > 0) {
                              BParray.map((data) => {
                                  if (data.fpVal) {
                                      if (data.fpVal > 100) {
                                          finalData[0] = data.fpVal;
                                      } else if (data.fpVal < 100) {
                                          finalData[1] = data.fpVal;
                                      }
                                  }
                              });
                          }
                      }
                      formattedEntry.blood_pressure = finalData;
                      break;
                  case "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated":

                      let heartData = 0;
                      if (mydataset.point[0]?.value) {
                          if (mydataset.point[0]?.value.length > 0) {
                              const heartArray = mydataset.point[0]?.value;
                              heartArray.map((data) => {
                                  if (data.fpVal) {
                                      heartData = data.fpVal;
                                  }
                              });
                          }
                      }
                      formattedEntry.heart_rate = heartData;
                      break;
                  case "derived:com.google.weight.summary:com.google.android.gms:aggregated":

                      formattedEntry.weight = value[0]?.fpVal || 0;
                      break;
                  case "derived:com.google.height.summary:com.google.android.gms:aggregated":

                      formattedEntry.height_in_cms = value[0]?.fpVal * 100 || 0;
                      break;
                  case "derived:com.google.sleep.segment:com.google.android.gms:merged":
                      // console.log("Sleep:",mydataset.point[0]?.value)
                      formattedEntry.sleep_hours = mydataset.point[0]?.value || 0;
                      break;
                  case "derived:com.google.body.fat.percentage.summary:com.google.android.gms:aggregated":

                      let bodyFat = 0;
                      if (mydataset.point[0]?.value) {
                          if (mydataset.point[0]?.value.length > 0) {
                              bodyFat = mydataset.point[0].value[0].fpVal;
                          }
                      }
                      formattedEntry.body_fat_in_percent = bodyFat;
                      break;
                  case "derived:com.google.menstruation:com.google.android.gms:aggregated":
                      // console.log("Menstrual:",mydataset.point[0]?.value)
                      formattedEntry.menstrual_cycle_start =
                          mydataset.point[0]?.value[0]?.intVal || 0;
                      break;
                  default:
                      break;
              }
          }

      });
    formattedData.push(formattedEntry);
  });
  if (!isSecondHit) {
    let user = await userModel.create({
        userName,
        profilePhoto,
        userId,
        formattedData

    })
    
  }
  console.log("Fitness data fetched successfully!");
 
  isSecondHit = true;
  res.send({
    userName,
    profilePhoto,
    userId,
    formattedData, // Include your fitness data here
  });


  } catch (error) {
    console.error('Error fetching fitness data:', error);
    
  }
});
  async function getUserProfile(auth) {
    const service = google.people({ version: "v1", auth });
    const profile = await service.people.get({
      resourceName: "people/me",
      personFields: "names,photos,emailAddresses",
    });
    const displayName = profile.data.names[0].displayName;
    const url = profile.data.photos[0].url;
    let userID = profile.data.resourceName;
    userID = parseInt(userID.replace("people/", ""), 10);
    return {
      displayName,
      profilePhotoUrl: url,
      userID,
    };
  }


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




