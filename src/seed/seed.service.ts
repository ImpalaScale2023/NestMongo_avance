import { Injectable } from '@nestjs/common';
//import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  //private readonly axios: AxiosInstance = axios;

  // imports:[PokemonModule] en el modulo seed
  // exports:[MongooseModule] en el modulo pokemon
  constructor(
      @InjectModel(Pokemon.name)
      private readonly pokeModel:Model<Pokemon>,
      private readonly http:AxiosAdapter ){}  

  // se comenta por que se va a crear otra manera
  // aca se tuvo, await en bucle y array de promesas que es mas rapido
  
  // async executedSeed(){

  //   await this.pokeModel.deleteMany({}); // delete * from pokemons

  //   const {data } = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

  //   const insertPromiseArray:any = [];

  //   data.results.forEach( ({name, url})=>{
      
  //     const segments = url.split('/');  //[ 'https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '' ]
  //     const no = +segments[ segments.length - 2 ];

  //     //const pokemon =  await this.pokeModel.create({name, no} );
  //     //si no pones await dentro del bucle, solo se crean promesas “pendientes” y no se espera nada ahí mismo.
  //     //llenamos el array de promesas
  //     insertPromiseArray.push(
  //       this.pokeModel.create({name, no})
  //     )
  //   } );
  //   //se ejecutan las prtomesas a la vez
  //   await Promise.all(insertPromiseArray);

  //   return 'Seed Executed!!';
  // }

  async executedSeed(){

    await this.pokeModel.deleteMany({}); // delete * from pokemons

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    const porkemonToIsnert:{name:string, no:number}[] = [];

    data.results.forEach( ({name, url})=>{
      
      const segments = url.split('/');  //[ 'https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '' ]
      const no = +segments[ segments.length - 2 ];

      porkemonToIsnert.push({name, no}); // [{name:bubasur, no:1}]
      
    } );
    
    this.pokeModel.insertMany(porkemonToIsnert);

    return 'Seed Executed!!';
  }
}
