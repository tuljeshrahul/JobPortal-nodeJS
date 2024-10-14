const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jobRoutes = require('./routes/jobRoutes');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/jobPosting', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

app.use('/api/v1/jobs',jobRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
