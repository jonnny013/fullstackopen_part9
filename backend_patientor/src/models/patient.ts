import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: String,
  ssn: String,
  gender: String,
  occupation: String,
  entries: Array,
});

patientSchema.set('toJSON', {
  virtuals: true, 
  transform: (_document, returnedObject) => {
    console.log('Before deletion:', returnedObject);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    console.log('After deletion:', returnedObject);
  },
});

patientSchema.pre('save', function (next) {

  this.id = this._id.toString();

  next();
});


module.exports = mongoose.model('Patient', patientSchema);