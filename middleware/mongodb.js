import mongoose from 'mongoose';

const URI = process.env.MONGODB_URL

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
//   mongoose.connect(URI, {

//     useNewUrlParser: true, 
    
//     useUnifiedTopology: true 
    
//     }, err => {
//     if(err) throw err;
//     console.log('Connected to MongoDB!!!')
//     });

  return handler(req, res);
};

export default connectDB;