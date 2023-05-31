const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Создаем базу данных
const db = new sqlite3.Database('users.db');

// Создаем таблицы если их нет
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`);
db.run(`CREATE TABLE IF NOT EXISTS messages ( 
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name TEXT NOT NULL, 
  email TEXT NOT NULL, 
  subject TEXT, 
  message TEXT NOT NULL 
)`);  
db.run(`CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dateStart TEXT NOT NULL,
  dateEnd TEXT NOT NULL,
  days TEXT NOT NULL,
  price TEXT NOT NULL,
  FIO TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  peopleCount TEXT NOT NULL,
  fromS TEXT,
  servicesSelected TEXT
)`);
db.run(`CREATE TABLE IF NOT EXISTS confirmedBookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dateStart TEXT NOT NULL,
  dateEnd TEXT NOT NULL,
  days TEXT NOT NULL,
  price TEXT NOT NULL,
  FIO TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  peopleCount TEXT NOT NULL,
  fromS TEXT,
  servicesSelected TEXT
)`);

// Middleware для валидации данных
function validateUserData(req, res, next) {
  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    return res.status(400).send('Данные заполнены некорректно');
  }

  next();
}

function validateMessageData(req, res, next) { 
  const { name, email, subject, message } = req.body; 
 
  if(!name || !email || !message) { 
    return res.status(400).send('Данные заполнены некорректно'); 
  } 
 
  next(); 
} 

function validateBookingData(req, res, next) {
  const { dateStart, dateEnd, days, price, FIO, email, phone, peopleCount, fromS, servicesSelected } = req.body;

  if(!dateStart || !dateEnd || !days || !price || !FIO || !email || !phone || !peopleCount) {
    return res.status(400).send('Данные заполнены некорректно');
  }

  next();
}

// GET-запрос для проверки данных авторизации
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Ищем пользователя в базе данных
  db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Ошибка сервера');
    }

    if (!row) {
      return res.status(401).send('Неправильный email или пароль');
    }

    res.json({ message: 'Авторизация прошла успешно' });
  });
});

// Обработка POST-запроса регистрации
app.post('/api/register', validateUserData, (req, res, next) => {
  const { name, email, password } = req.body;

  // Добавляем пользователя в базу данных
  db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Ошибка сервера');
    }
    console.log(`Пользователь "${name}" добавлен в базу данных`);
    res.json({ message: 'Регистрация прошла успешно' });
  });
});

// Обработка POST-запроса отправки сообщения
app.post('/api/sendMessage', validateMessageData, (req, res, next) => { 
  const { name, email, subject, message } = req.body; 
 
  // Добавляем пользователя в базу данных 
  db.run(`INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)`, [name, email, subject, message], (err) => { 
    if (err) { 
      console.log(err); 
      return res.status(500).send('Ошибка сервера'); 
    } 
    console.log(`Сообщение пользователя "${name}" успешно отправлено`); 
    res.json({ message: 'Сообщение отправлено' }); 
  }); 
});

// Обработка POST-запроса отправки бронирвания
app.post('/api/sendBooking', validateBookingData, (req, res, next) => {
  const { dateStart, dateEnd, days, price, FIO, email, phone, peopleCount, fromS, servicesSelected } = req.body;

  // Добавляем пользователя в базу данных
  db.run(`INSERT INTO bookings (dateStart, dateEnd, days, price, FIO, email, phone, peopleCount, fromS, servicesSelected)  
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,  
  [dateStart, dateEnd, days, price, FIO, email, phone, peopleCount, fromS, JSON.stringify(servicesSelected)], (err) => { 
    if (err) { 
      console.log(err); 
      return res.status(500).send('Ошибка сервера'); 
    } 
    console.log(`Данные о бронировани отправлены`); 
    res.json({ message: 'Сообщение отправлено' }); 
  }); 
});

// Вывод пользователей
app.get('/api/checkUsers', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }

    res.json(rows);
  });
});
// Удаление пользователей по id 
app.delete('/api/deleteUser/:id', (req, res) => { 
  const { id } = req.params; 
 
  db.run(`DELETE FROM users WHERE id = ?`, [id], (err) => { 
    if (err) { 
      console.log(err); 
      return res.status(500).send('Ошибка сервера'); 
    } 
    console.log(`Пользователь с id "${id}" удален из базы данных`); 
    res.json({ message: 'Пользователь успешно удален' }); 
  }); 
});

// Вывод сообщений
app.get('/api/checkMessages', (req, res) => {
  db.all('SELECT * FROM messages', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }

    res.json(rows);
  });
});
// Удаление сообщений по id 
app.delete('/api/deleteMessage/:id', (req, res) => { 
  const { id } = req.params; 
 
  db.run(`DELETE FROM messages WHERE id = ?`, [id], (err) => { 
    if (err) { 
      console.log(err); 
      return res.status(500).send('Ошибка сервера'); 
    } 
    console.log(`Сообщение с id "${id}" удалено из базы данных`); 
    res.json({ message: 'Сообщение успешно удалено' }); 
  }); 
});

// Вывод заявок на бронь
app.get('/api/checkBookings', (req, res) => {
  db.all('SELECT * FROM bookings', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }

    res.json(rows);
  });
});
// Подтверждение заявок на бронь по id 
app.delete('/api/confBooking/:id', (req, res) => { 
  const { id } = req.params; 

  db.get(`SELECT * FROM bookings WHERE id = ?`, [id], (err, row) => {
    if (err) {
      console.log(err); 
      return res.status(500).send('Ошибка сервера');
    }

    db.run(`INSERT INTO confirmedBookings(id, dateStart, dateEnd, days, price, FIO, email, phone, peopleCount, fromS, servicesSelected) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
              [row.id, row.dateStart, row.dateEnd, row.days, row.price, row.FIO, row.email, row.phone, row.peopleCount, row.fromS, row.servicesSelected], (err) => {
        if (err) { 
          console.log(err); 
          return res.status(500).send('Ошибка сервера'); 
        } 
        console.log(`Заявка на бронь с id "${id}" подтверждена`); 
        res.json({ message: 'Заявка успешна подтверждена' }); 
    });

    db.run(`DELETE FROM bookings WHERE id = ?`, [id], (err) => { 
      if (err) { 
        console.log(err); 
        return res.status(500).send('Ошибка сервера'); 
      } 
      console.log(`Заявка на бронь с id "${id}" удалена из базы данных`); 
    }); 
  }); 
});
// Удаление заявок на бронь по id 
app.delete('/api/deleteBooking/:id', (req, res) => { 
  const { id } = req.params; 

    db.run(`DELETE FROM bookings WHERE id = ?`, [id], (err) => { 
      if (err) { 
        console.log(err); 
        return res.status(500).send('Ошибка сервера'); 
      } 
      console.log(`Заявка на бронь с id "${id}" удалена из базы данных`); 
      res.json({ message: 'Заявка успешна удалена' }); 
    }); 
});

// Вывод подтвержденных броней
app.get('/api/confBookings', (req, res) => {
  db.all('SELECT * FROM confirmedBookings', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }

    res.json(rows);
  });
});
// Удаление подтвержденных броней по id
app.delete('/api/deleteConfBooking/:id', (req, res) => { 
  const { id } = req.params; 

    db.run(`DELETE FROM confirmedBookings WHERE id = ?`, [id], (err) => { 
      if (err) { 
        console.log(err); 
        return res.status(500).send('Ошибка сервера'); 
      } 
      console.log(`Бронь с id "${id}" удалена из базы данных`); 
      res.json({ message: 'Бронь успешна удалена' }); 
    }); 
});

// Запускаем сервер
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});