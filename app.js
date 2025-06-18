
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb+srv://talentx:agosto08@clustertalentx.xol9ohm.mongodb.net/start_neuro?retryWrites=true&w=majority&appName=clusterTalentX');

const Agendamento = mongoose.model('contato', {
  nome: String,
  email: String,
  mensagem: String,
  data: { type: Date, default: Date.now }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home', { query: req.query });
});

app.post('/agendar', async (req, res) => {
  const { nome, email, mensagem } = req.body;
  await Agendamento.create({ nome, email, mensagem });
  res.redirect('/?sucesso=true');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
