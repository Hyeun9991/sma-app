import User from '../models/User.js';

// Read

// id 값을 사용하여 DB에서 사용자 조회, JSON 형식으로 전달
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 사용자의 친구들 정보를 DB에서 조회
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // 사용자의 친구들을 비동기적으로 조회
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // 친구들의 정보를 원하는 형식으로 변환하여 새로운 배열로 생성
    const formattedFriends = friends.map(
      ({ _id, friends, lastName, occupation, location, picturePath }) => {
        return { _id, friends, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // user.friends 배열에 friendId가 포함되어 있는지 확인
    if (user.friends.includes(findById)) {
      user.friends = user.friends.filter((id) => id !== friendId); // user.friends 배열에서 friendId를 제거
      friend.friends = friend.friends.filter((id) => id !== id); // friend.friends 배열에서 id를 제거
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    // 사용자의 친구들을 비동기적으로 조회
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // 친구들의 정보를 원하는 형식으로 변환하여 새로운 배열로 생성
    const formattedFriends = friends.map(
      ({ _id, friends, lastName, occupation, location, picturePath }) => {
        return { _id, friends, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
