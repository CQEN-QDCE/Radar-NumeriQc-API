const enonceService =  require("../services/enonceService");

module.exports = {
  //Obtenir tous les énoncées
  enoncesGet: async (req, res) => {
    res.status(200).send(await enonceService.getEnonces());
  },

  enonceGetById: async (req, res) => {
    const enonce = await enonceService.getEnonceById(req.params.id);
    
    if (enonce)
      res.status(200).send(enonce);
    else
      res.status(404).send();
  },

  enonceCreate: async (req, res) => {
    res.status(404).send();
  },

  enonceUpdate: async (req, res) => {
    res.status(404).send();
  },

  enonceDelete: async (req, res) => {
    res.status(404).send();
  },

};
