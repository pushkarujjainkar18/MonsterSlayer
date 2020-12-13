function getRandomValue(min,max){
    return Math.floor(Math.random() * (max-min))+min;
}
const app =Vue.createApp({
    data(){
        return{
            playerHealth:100,
            monsterHealth:100,
            currentRound:0,
            winner:null,
            logMessages:[],
        };
    },
    watch:{
        playerHealth(value){
          if(value<=0 && this.monsterHealth<=0){
              //draw
            this.winner='draw';
          }else if(value<=0){
              //player lost
            this.winner='monster';
          }  
        },
        monsterHealth(value){
            if(value<=0 && this.playerHealth<=0){
                //draw
                this.winner='draw';
            }else if(value<=0){
                //monster lost
                this.winner='player';
            }  
        },
    },
    computed:{
        monsterBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.currentRound %3 !==0;
        }
    },
    methods:{
        startAgain(){
            this.playerHealth=100;
            this.monsterHealth=100;
            this.currentRound=0;
            this.winner=null;
            this.logMessages=[];
        },
        attackMonster(){
            this.currentRound++;
            const attackValue=getRandomValue(5,12)
            this.monsterHealth -= attackValue;
            this.addLogMessages('player','attack',attackValue);
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue=getRandomValue(8,15);
            this.playerHealth -= attackValue;
            this.addLogMessages('monster','attack',attackValue);
        },
        specialAttackMonster(){
            this.currentRound++;
            const attackValue=getRandomValue(12,25);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player','attack',attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue=getRandomValue(8,15);
            if(this.playerHealth + healValue > 100){
                this.playerHealth=100;
            }else{
                 this.playerHealth += healValue;
            }
            this.addLogMessages('player','heal',healValue);
            this.attackPlayer();
        },
        surrenderPlayer(){
            this.winner='monster';
        },
        addLogMessages(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value,
            });
        }
    },
});
app.mount('#game');