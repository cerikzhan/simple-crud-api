require('dotenv').config();

const { main } = require('./src/index');

try {
    main();
} catch (err) {
    console.log(err.message);
}
