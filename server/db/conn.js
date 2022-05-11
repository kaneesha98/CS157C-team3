const mongoose = require("mongoose"); 

const dbConnect = async () => {
  try {
      await mongoose.connect(process.env.ATLAS_URI, 
          {
          useUnifiedTopology: true,
          useNewUrlParser: true,
      });
      console.log(`Database connected succesfully`);


  } catch (error) {
      console.log(`Error: ${error.message}`);
  }
};

module.exports = dbConnect;
