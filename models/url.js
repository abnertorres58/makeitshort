var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// keep auto increment on this table
var CounterSchema = Schema({
    _id: {type: String, required: true},
    url_count: { type: Number, default: 0 }
});

var stats = mongoose.model('url_stats', CounterSchema);

// create a schema for our links
var urlSchema = new Schema({
    _id: {type: Number, index: true},
    original_url: String,
    hits: { type: Number, default: 0 },
});

urlSchema.pre('save', function(next){
    var doc = this;

    // increment counter in the sequence table and use it as the new Url._id
    stats.findByIdAndUpdate({_id: 'url_stats'}, {$inc: {url_count: 1} }, function(error, counter) {
        if (error)
            return next(error);
        doc._id = counter.url_count;
        next();
    });
});

var Url = mongoose.model('Url', urlSchema);

// export models
module.exports = {
    stats: stats,
    Url: Url
};
