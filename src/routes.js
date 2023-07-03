const { Router } = require('express');

const DesenvolvedorController = require('./app/controllers/DesenvolvedorController');
const NivelController = require('./app/controllers/NivelController');

const router = Router();

router.get('/desenvolvedores', DesenvolvedorController.index);
router.get('/desenvolvedores/:id', DesenvolvedorController.show);
router.delete('/desenvolvedores/:id', DesenvolvedorController.delete);
router.post('/desenvolvedores', DesenvolvedorController.store);
router.put('/desenvolvedores/:id', DesenvolvedorController.update);

router.get('/niveis', NivelController.index);
router.get('/niveis/:id', NivelController.show);
router.delete('/niveis/:id', NivelController.delete);
router.post('/niveis', NivelController.store);
router.put('/niveis/:id', NivelController.update);

module.exports = router;
