const Shifokor = require('../model/ShifokorSchema');
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

// Foydalanuvchilarni olish funksiyasi
const getShifokor = async (req, res) => {
    try {
        const data = await Shifokor.find();
        res.json({
            success: true,
            message: "All Shifokor",
            innerData: data
        });
    } catch (error) {
        console.error("Error>>>", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// Ro'yxatdan o'tish funksiyasi
const createShifokor = async (req, res) => {
    try {
        const {
            fname,
            lname,
            username,
            password
        } = req.body;

        const existingShifokor = await Shifokor.findOne({ lname, });
        if (existingShifokor) {
            return res.status(400).json({
                success: false,
                message: "Bu Shifokor egasi allaqachon mavjud!!!"
            });
        }

        const newShifokor = new Shifokor({
            fname,
            lname,
            username,
            password
        });

        // Yangi Shifokor saqlash
        await newShifokor.save();

        // Muvaffaqiyatli ro'yxatdan o'tkazilganlik xabari
        return res.status(201).json({
            success: true,
            message: "Shifokor yaratish muvaffaqiyatli amalga oshirildi!"
        });
    } catch (error) {
        console.error("Xatolik:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi!"
        });
    }
};

// Shifokorni o'chirish funksiyasi
const deleteShifokor = async (req, res) => {
    try {
        let { _id } = req.params;
        let deleted = await Shifokor.findByIdAndDelete({ _id: _id });
        if (!deleted) {
            return res.json({
                success: false,
                message: "Shifokor topilmadi!",
                innerData: deleted
            });
        }
        res.json({
            success: true,
            message: "Shifokor o'chirildi!",
            innerData: deleted
        });
    } catch (error) {
        res.json({ success: false, message: error });
    }
};
const updateShifokor = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Product modelida yangilanishdan oldin validatsiya
        if (!id || !updateData) {
            return res.status(400).json({ success: false, message: 'Iltimos, barcha ma\'lumotlarni to\'ldiring!' });
        }

        // Mahsulotni yangilash
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        // Mahsulot mavjudligini tekshirish
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Mahsulot topilmadi!' });
        }

        res.status(200).json({ success: true, message: 'Shifokor yangilandi!', data: updatedProduct });
    } catch (error) {
        console.error('Mahsulotni yangilashda xatolik:', error);
        res.status(500).json({ success: false, message: 'Serverda xatolik yuz berdi!' });
    }
};


module.exports = {
    getShifokor,
    createShifokor,
    deleteShifokor,
    updateShifokor,
  
};
