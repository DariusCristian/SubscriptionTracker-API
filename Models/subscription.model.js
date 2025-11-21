// Models/subscription.model.js
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Subscription name is required"],
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        price: {
            type: Number,
            required: [true, "Subscription price is required"],
            min: [0, "Price must be greater than 0"],
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "GBP"],
            default: "USD",
        },
        frequency: {
            type: String,
            enum: ["daily", "weekly", "monthly", "yearly"],
            required: true,
        },
        category: {
            type: String,
            enum: [
                "sports",
                "news",
                "entertainment",
                "lifestyle",
                "technology",
                "finance",
                "politics",
                "other",
            ],
            required: true,
        },
        paymentMethod: {
            type: String,
            required: [true, "Payment methods are required"],
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "cancelled", "inactive", "expired"],
            default: "active",
        },
        startDate: {
            type: Date,
            required: true,
        },
        renewalDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    if (!value || !this.startDate) return true;
                    return value > this.startDate;
                },
                message: "Renewal date must be after the start date",
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

// calculează automat renewalDate, dacă lipsește
subscriptionSchema.pre("validate", function (next) {
    if (!this.renewalDate && this.startDate && this.frequency) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        const days = renewalPeriods[this.frequency];
        if (days) {
            const date = new Date(this.startDate);
            date.setDate(date.getDate() + days);
            this.renewalDate = date;
        }
    }

    if (this.renewalDate && this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();
});

const Subscription =
    mongoose.models.Subscription ||
    mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
