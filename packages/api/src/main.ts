import {connection} from "@contributors/global";
import {ContributorService} from "./app/contributor.service";
import express from 'express';
const app = express();


(async () => {
  await connection();
  app.get('/', async (req, res) => {
    res.json({success: true});
  });

  app.use('/contributors', async (req, res) => {
    res.json(await ContributorService.getList());
  });

  app.use('/contributor/:name', async (req, res) => {
    if (!req.params.name) {
      res.send(false);
    }

    res.json(await ContributorService.getOne(req.params.name));
  });

  app.listen(process.env.EXPRESS, () => {
    console.log('listening on port ' + process.env.EXPRESS);
  });
})();
