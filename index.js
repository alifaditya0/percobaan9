const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:false }));

const alatRoutes = require('./router/alat_tangkap');
app.use('/api/alat_tangkap', alatRoutes);

const dpiRoutes = require('./router/dpi');
app.use('/api/dpi', dpiRoutes);

const pemilikRoutes = require('./router/pemilik');
app.use('/api/pemilik', pemilikRoutes);

const KapalRoutes = require('./router/kapal');
app.use('/api/kapal', KapalRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
