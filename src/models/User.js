import { model, Schema } from 'mongoose';

const useSchema = new Schema(
  {
    email: { type: String, trim: true, unique: true, required: true },
    nickname: { type: String, maxlength: 20, unique: true, required: true },
    password: { type: String, minlenght: 4, required: true },
  },
  { versionKey: false },
);

export default model('user', useSchema);
