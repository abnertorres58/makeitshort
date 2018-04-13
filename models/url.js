var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// keep auto increment on this table
var SequencesSchema = Schema({
    _id: {type: String, required: true},
    sequence_value: {type: Number, default: 0}
  }
);

var sequences = mongoose.model('sequences', SequencesSchema, 'sequences');

// create a schema for our links
var urlSchema = new Schema({
  _id: {type: Number, index: true},
  original_url: String,
  conversions: {type: Number, default: 1}, // # requests to be shortened
  hits: {type: Number, default: 0}, // times visited
});

urlSchema.pre('save', function (next) {
  var doc = this;

  // increment counter in the sequence table and use it as the new Url._id
  sequences.findByIdAndUpdate({_id: 'current_sequence'}, {$inc: {sequence_value: 1}}, function (error, counter) {
    if (error)
      return next(error);
    doc._id = counter.sequence_value;
    next();
  });

});

var Url = mongoose.model('Url', urlSchema);

// export models
module.exports = {
  sequences: sequences,
  Url: Url
};
