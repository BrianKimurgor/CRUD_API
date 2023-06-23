import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';

export default ({ config, db }) => {
  let api = Router();

  // '/v1/restaurant/add'-create

  api.post('/add', async (req, res) => {
    try {
      let newRest = new Restaurant();
      newRest.name = req.body.name;

      await newRest.save();

      res.json({ 'message saved successfully': newRest });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  // '/v1/restaurant'-read
  api.get('/', async (req, res) =>{
    try{
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
  });

  //'/v1/restaurant/:id' -Read 1
  api.get('/:id', async (req, res ) =>{
    try{
        const restaurant = await Restaurant.findById(req.params.id);
        res.json(restaurant);
    }catch(err){
        res.send(err);
    }
  });

  //'/v1/restaurant/:id' update
  api.put('/:id', async (req, res) =>{
    try{
        const updateRestaurant = await Restaurant.findOneAndUpdate(
            {_id: req.params.id},
            {$set:req.body},
            {new: true}
        );
        res.json({message: 'info restaurant updated'});
    }catch(err){
        res.send(err);
    }
  });

  //'v1/restaurant/:id' delete
  api.delete('/id')


  return api;
};
