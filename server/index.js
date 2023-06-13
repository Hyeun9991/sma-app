import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from './controllers/auth.js';

// Configurations, 설정
const __filename = fileURLToPath(import.meta.url); // 현재 파일의 경로를 가져옴
const __dirname = path.dirname(__filename); // 현재 파일의 디렉토리 경로를 가져옴
dotenv.config();
const app = express();
app.use(express.json()); // JSON 데이터를 파싱하기 위해 express의 미들웨어 사용
app.use(helmet()); // 보안 관련 헤더를 설정하기 위해 helmet 미들웨어 사용
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); // Cross-Origin 리소스 정책 설정
app.use(morgan('common')); // 로깅을 위해 morgan 미들웨어 사용
app.use(bodyParser.json({ limit: '30mb', extended: true })); // JSON 데이터 파싱을 위해 bodyParser 미들웨어 사용
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true })); // URL 인코딩된 데이터 파싱을 위해 bodyParser 미들웨어 사용
app.use(cors()); // CORS(Cross-Origin Resource Sharing) 허용 설정
app.use('/assets', express.static(path.join(__dirname, 'public/assets'))); // 정적 파일 제공을 위해 express.static 미들웨어 사용

// File Storage, 파일 저장
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets'); // 파일이 저장될 경로 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 저장되는 파일의 이름 설정
  },
});
const upload = multer({ storage }); // 파일 업로드를 위한 multer 설정

// Routes with Files
app.post('/auth/register', upload.single('picture', register)); // 'picture' 필드의 파일을 업로드

// Mongoose Setup
const PORT = process.env.PORT || 8123;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
