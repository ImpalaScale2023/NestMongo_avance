import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model} from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
 

@Injectable()
export class PokemonService {
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokeModel:Model<Pokemon>){}

  
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase().trim();

    try {
      const pokemon =  await this.pokeModel.create(createPokemonDto );
      return pokemon;
      
    } catch (error) {
      
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {

    let poke:Pokemon| null = null;
    //verificamos si la busqueda sera por el nnumero o por el Id
     if (!isNaN(+term)){
        poke = await this.pokeModel.findOne({no:term});
    }
    //MongoId
    if (!poke && isValidObjectId(term) ){
      poke = await this.pokeModel.findById(term);
    }

    //name
    if(!poke){
      poke = await this.pokeModel.findOne({name:term.toLowerCase().trim()});
    }

    if(!poke){
      throw new NotFoundException(`Pokemon witd id, name or No "${term}" not found.`);
    }

    return poke;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    const  poke = await this.findOne(term);
    
    if (updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name?.toLocaleLowerCase().trim();
      }
    
    try {
      await poke.updateOne(updatePokemonDto);
      return {...poke.toJSON(), ...updatePokemonDto };
      
    } catch (error) {
       this.handleExceptions(error);
    }
    
  }

  async remove(id: string):Promise<{deleted: boolean}> {

    // const poke = await this.findOne(id);
    // await poke.deleteOne();
    //return {id};
    
    //const result =  await this.pokeModel.findByIdAndDelete(id);

    const result =  await this.pokeModel.deleteOne({_id:id}); 
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Pokemon with id "${id}" not found`);
    }

    return {deleted:true};
  }

  private handleExceptions(error:any){
    if (error.code === 11000) { 
        throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue) }`)
      }
    throw new InternalServerErrorException(`Can't update Pokemon - Check Server Logs`);
  }
}
