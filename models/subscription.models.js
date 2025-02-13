import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minlength: [3, 'Subscription Name must be at least 3 characters long'],
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription Price is required'],
        min: [0, 'Subscription Price must be greater than 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'CAD'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['monthly', 'yearly', 'weekly', 'daily'],
    },
    category: {
        type: String,
        enum: ['free', 'basic', 'pro', 'enterprise'],
        required: [true, 'Subscription Category is required'],
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start Date must be in the past',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) { 
                return value > this.startDate;
            },
            message: 'Renewal Date must be after Start Date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, 
    },
   
},
 {timestamps: true}
);

// Auto-calculate renewal date if not provided
subscriptionSchema.pre('save', function(next) {
    
    if (!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        }
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }

    //auto-update the status if renewal date has passed

    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription; 


