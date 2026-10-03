import { questionHandler } from './_quiz.js';

export default async function handler(req, res) {
  return questionHandler(req, res);
}
