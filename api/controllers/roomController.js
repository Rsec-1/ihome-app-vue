const mongoose = require("mongoose");
const Room = require("../models/room");
const House = require("../models/house");

// 添加房间
exports.addRoom = async (req, res) => {
  try {
    const { houseId, name } = req.body;
    const room = new Room({ houseId, name });
    await room.save();

    const house = await House.findById(houseId);
    if (house) {
      house.rooms.push(room._id);
      await house.save();
    } else {
      return res.status(404).json({ message: "House not found" });
    }

    res.status(201).json({ message: "Room added successfully", room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 删除房间
exports.deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findByIdAndDelete(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const house = await House.findById(room.houseId);
    if (house) {
      house.rooms = house.rooms.filter(
        (id) => id.toString() !== room._id.toString()
      );
      await house.save();
    }

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 更新房间
exports.updateRoom = async (req, res) => {
  try {
    const { roomId, name } = req.body;
    const room = await Room.findByIdAndUpdate(roomId, { name }, { new: true });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room updated successfully", room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 获取房子的所有房间
exports.getHouseRooms = async (req, res) => {
  try {
    const { houseId } = req.params;
    const rooms = await Room.find({ houseId });
    res.status(200).json({ rooms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
