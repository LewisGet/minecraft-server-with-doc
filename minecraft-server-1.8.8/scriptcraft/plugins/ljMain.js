if (! exports.lj)
{
	exports.lj = {};
};

Number.prototype.between = function(a, b) {
    var min = Math.min.apply(Math, [a, b]);
    var max = Math.max.apply(Math, [a, b]);

    return this > min && this < max;
};

exports.lj.entityType = org.bukkit.entity.EntityType;

exports.lj.createEntity = function (local, entityType) {
    var entity = local.world.spawnEntity(local, entityType);

    return entity;
};

exports.lj.supperZombie = function (local) {
    var z = exports.lj.createEntity(local, exports.lj.entityType.ZOMBIE);

    z.setCanPickupItems(true);
    z.setMaxHealth(300);
    z.setHealth(300);

    return z;
};

exports.lj.supperCreeper = function (local) {
    var c = exports.lj.createEntity(local, exports.lj.entityType.CREEPER);

    c.setMaxHealth(300);
    c.setHealth(300);

    return c;
};

exports.lj.luckyCreeper = function (local) {
    var c = exports.lj.createEntity(local, exports.lj.entityType.CREEPER);

    c.customName = "Lucky Creeper";
    c.powered = 1;
    c.setMaxHealth(300);
    c.setHealth(300);

    return c;
};

exports.lj.supperSkeleton = function (local) {
	var s = exports.lj.createEntity(local, exports.lj.entityType.SKELETON);

    s.setMaxHealth(300);
    s.setHealth(300);

    return s;
};

exports.lj.getKevinKiller = function () {

};

/*
exports.lj.dieLess = 1000;

events.playerMove(function (event) {

    var player = event.getPlayer();

    exports.lj.dieLess--;

    if (exports.lj.dieLess.between(20, 200) && (exports.lj.dieLess % 10) == 0)
    {
        player.chat(exports.lj.dieLess);
    }

    if (exports.lj.dieLess < 0)
    {
        // new less
        exports.lj.dieLess = Math.floor((Math.random() * 1000) + 1);

        // excute location
        var location = player.location;

        try {
            entitys = ['AGEABLE','AMBIENT','ANIMALS','ANIMALTAMER','AREAEFFECTCLOUD','ARMORSTAND','ARROW','BAT','BLAZE','BOAT','CAVESPIDER','CHICKEN','COMPLEXENTITYPART','COMPLEXLIVINGENTITY','COW','CREATURE','CREEPER','DAMAGEABLE','DRAGONFIREBALL','EGG','ENDERCRYSTAL','ENDERDRAGON','ENDERDRAGONPART','ENDERMAN','ENDERMITE','ENDERPEARL','ENDERSIGNAL','ENTITY','EXPERIENCEORB','EXPLOSIVE','FALLINGBLOCK','FALLINGSAND','FIREBALL','FIREWORK','FISH','FISHHOOK','FLYING','GHAST','GIANT','GOLEM','GUARDIAN','HANGING','HORSE','HUMANENTITY','IRONGOLEM','ITEM','ITEMFRAME','LARGEFIREBALL','LEASHHITCH','LIGHTNINGSTRIKE','LINGERINGPOTION','LIVINGENTITY','MAGMACUBE','MINECART','MONSTER','MUSHROOMCOW','NPC','OCELOT','PAINTING','PIG','PIGZOMBIE','PLAYER','POLARBEAR','POWEREDMINECART','PROJECTILE','RABBIT','SHEEP','SHULKER','SHULKERBULLET','SILVERFISH','SKELETON','SLIME','SMALLFIREBALL','SNOWBALL','SNOWMAN','SPECTRALARROW','SPIDER','SPLASHPOTION','SQUID','STORAGEMINECART','TAMEABLE','THROWNEXPBOTTLE','THROWNPOTION','TIPPEDARROW','TNTPRIMED','VEHICLE','VILLAGER','WITCH','WOLF','ZOMBIE'];

            entity = entitys[Math.floor(Math.random() * entitys.length)];

            entity = exports.lj.createEntity(location, exports.lj.entityType[entity]);
        }
        catch(err) {
            // can't excute
            //player.setHealth(0);
        }
    }
});
*/
/*
// give all player op
events.playerJoin(function (player){
    player.setOp(true);
});

var utils = require('utils');

var lewis = utils.player("LewisJang");

setInterval(function(){
    lewis.setMaxHealth(1024);
    lewis.setHealth(1024);
    lewis.setFoodLevel(20);
}, 100);
*/

exports.lj.houseBlockLocals = [];

exports.lj.chaosSortOutHouseBlockLocals = function () {
    var shuffle = function (a,b) {
        var num = Math.random() > 0.5 ? -1 : 1;

        return num;
    }

    exports.lj.houseBlockLocals.sort(shuffle);
};

exports.lj.endermanRemoveHouse = function (delay) {
    exports.lj.chaosSortOutHouseBlockLocals();

    for (var i = 0; i < exports.lj.houseBlockLocals.length; i++)
    {
        var local = exports.lj.houseBlockLocals[i];

        var doExcute = function (local, i) {
            setTimeout(function(){
                exports.lj.endermanGetBlockExcute(local);
            }, delay + (30 * i));
        };

        doExcute(local, i);
    }
};

exports.lj.endermanGetBlockExcute = function (local) {
    var createLocal = new org.bukkit.Location(local.world, local.x, local.y, local.z);

    createLocal.x += parseInt(Math.random() * 10);
    createLocal.z += parseInt(Math.random() * 10);

    if (Math.random() > 0.5)
    {
        createLocal.x -= parseInt(Math.random() * 20);
    }

    if (Math.random() > 0.5)
    {
        createLocal.z -= parseInt(Math.random() * 20);
    }

    diffX = createLocal.x - local.x;
    diffZ = createLocal.z - local.z;

    preDiffX = diffX / 30;
    preDiffZ = diffZ / 30;

    var enderman = exports.lj.createEntity(createLocal, exports.lj.entityType.ENDERMAN);

    enderman.setMaxHealth(1024);
    enderman.setHealth(1024);

    for (var i = 1; i <= 30; i++)
    {
        createLocal.x = createLocal.x + (i * preDiffX);
        createLocal.z = createLocal.z + (i * preDiffZ);

        setTimeout(function() {
            enderman.teleport(createLocal);
        }, 16 * i);
    }

    setTimeout(function(){
        exports.lj.endermanGetBlockModule(enderman, local);
    }, 500);
};

exports.lj.endermanGetBlockModule = function (enderman, blockLocal) {
    var itemForEnderMan = new org.bukkit.material.MaterialData(blockLocal.block.getType());

    // remove block
    blockLocal.block.setTypeId(0);

    enderman.teleport(blockLocal);

    enderman.carriedMaterial = itemForEnderMan;
};

exports.lj.buildHouse = function (local, basic) {
    if (basic)
    {
        basic = 5;
    }

    var x = local.x;
    var z = local.z;
    var y = local.y;

    var blockMoveOutDelay = 5000;

    // well
    for (var bx = 0; bx < 5; bx++)
    {
        for (var bz = 0; bz < 5; bz++)
        {
            for (var by = 0; by < 3; by++)
            {
                local.x = x + bx;
                local.z = z + bz;
                local.y = y + by;

                // clear map
                local.block.setTypeId(0);

                if (bz == 0 || bz == 4 ||
                    bx == 0 || bx == 4 ||
                    by == 2)
                {
                    local.block.setTypeId(basic);

                    exports.lj.houseBlockLocals.push(new org.bukkit.Location(local.world, local.x, local.y, local.z));

                    blockMoveOutDelay += 100;
                }

                // door clear
                if (bz == 2 && bx == 0 && (by == 0 || by == 1))
                {
                    local.block.setTypeId(0);
                }
            }
        }
    }

    bz = 2;
    bx = 0;

    local.x = x + 0;
    local.z = z + 2;
    local.y = y + 0;

    local.block.setTypeId(64);

    local.y = y + 1;

    local.block.setTypeIdAndData(64, 8, false);

    local.x = x + 3;
    local.z = z + 1;
    local.y = y + 0;

    local.block.setTypeIdAndData(26, 11, false);

    local.x = x + 2;

    local.block.setTypeIdAndData(26, 3, false);

    local.z = z + 2;
    local.x = x + 3;

    local.block.setTypeIdAndData(26, 11, false);

    local.x = x + 2;

    local.block.setTypeIdAndData(26, 3, false);

    local.z = z + 3;
    local.x = x + 3;

    local.block.setTypeId(58);

    local.z = z + 3;
    local.x = x + 1;

    local.block.setTypeIdAndData(54, 2, false);

    local.x = x + 2;

    local.block.setTypeIdAndData(54, 2, false);

    // var item = new org.bukkit.inventory.ItemStack(5, 64, 2);
    // local.block.getState().getInventory().addItem(item);
};

//exports.lj.gravel = function