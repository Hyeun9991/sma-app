import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(403).send('Access Denied');
    }

    // 토큰 값이 "Bearer "로 시작하는 경우 "Bearer " 부분을 제거하고 좌측 공백을 제거하여 토큰 값만 남김
    if (token.startWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // 검증된 사용자 정보를 요청 객체(req)의 user 속성에 추가
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
