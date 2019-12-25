import { mongoose, hg } from '../config/db';

const hgSchema = new mongoose.Schema({
  id: String,
  category: String,
  content: Array,
  issue: Number,
  createdAt: String
});

const HgModel = hg.model('posts', hgSchema);

export default HgModel;
