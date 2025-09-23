import { Code } from './../../node_modules/bson/src/code';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokeModel:Model<Pokemon>){}

  
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon =  await this.pokeModel.create(createPokemonDto );
      return pokemon;
      
    } catch (error) {
      const e = error as any;
      console.log(e.Code);
      if (e.Code === 11000 ) {
        throw new BadRequestException(`Pokemons exists in db ${ JSON.stringify( e.keyValue) }`)
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Chekc Server Logs`);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
