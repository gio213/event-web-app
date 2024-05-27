import { model, models, Schema } from "mongoose";


export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    eventLocation?: string;
    createdAt?: Date;
    imageUrl: string;
    startDateTime?: Date;
    endDateTime?: Date;
    price?: string;
    isFree?: boolean;
    url?: string;
    category: { _id: string, name: string }
    organaizer: { _id: string, firstName: string, lastName: string }
}

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    eventLocation: { type: String },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    startDateTime: { type: Date, default: Date.now },
    endDateTime: { type: Date, default: Date.now },
    price: { type: String },
    isFree: { type: Boolean, default: false },
    url: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    organaizer: { type: Schema.Types.ObjectId, ref: 'User' },
});


const Event = models.Event || model('Event', EventSchema);

export default Event;