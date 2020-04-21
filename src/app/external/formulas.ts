import { cpm as cpmPerLevel } from './constants';
/*import { raidBossStamina as bossStamina } from './constants';*/

function CalculateCombatPower(pokemon, level = 40, ivs = { atk: 15, def: 15, sta: 15}) {
	var cpm = cpmPerLevel[2 * level - 2];

	var Attack = pokemon.atk + ivs.atk;
	var Defense = pokemon.def + ivs.def;
	var Stamina = pokemon.sta + ivs.sta;

	return Math.floor((Attack * Math.pow(Defense, 0.5) * Math.pow(Stamina, 0.5) * Math.pow(cpm, 2))/10);
}

function NerfState(state){
    return Math.round(state * 0.91)
    }

function ScaledAtk(atk,sAtk){
    return (Math.round(2*( 7/8*Math.max(sAtk,atk)+1/8*Math.min(sAtk,atk))))
}
function SpeedMod(speed){
    return ((1+(speed-75)/500))
}

function ScaledDef(def,sDef){
    return (Math.round(2*( 5/8*Math.max(sDef,def)+3/8*Math.min(sDef,def))))
}

function CalculateAtk(atk,sAtk,speed){
    return Math.round(ScaledAtk(sAtk,atk)*SpeedMod(speed))
}

function CalculateDef(def,sDef,speed){
    return Math.round(ScaledDef(def,sDef)*SpeedMod(speed))
}

function calculateHp(hp){
    return Math.floor(hp*1.75+50)
}


export {CalculateCombatPower,CalculateAtk,CalculateDef,calculateHp,NerfState}