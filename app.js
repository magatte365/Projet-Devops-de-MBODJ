const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

const app = express();
app.use(express.json());

// Modèle MongoDB
const Task = mongoose.model('Task', {
  title: String,
  description: String,
  completed: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Endpoint pour créer une tâche (WRITE)
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint pour récupérer toutes les tâches (READ)
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/tasksdb')
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});