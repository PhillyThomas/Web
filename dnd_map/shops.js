var combinedGold;
var upgradedShops;
var boats = [];
const shopsUnlocked = [
	{
		name:"Town Mayor",
		unlocked:true
	},
	{
		name:"Astrologian",
		unlocked:true
	},
	{
		name:"Shipwright",
		unlocked:true
	},
	{
		name:"Apothecary",
		unlocked:true
	},
	{
		name:"Adventurer Supplies",
		unlocked:true
	},
	{
		name:"Blacksmith",
		unlocked:true
	},
	{
		name:"Wonders and Worries",
		unlocked:true
	},
];

const shops = [
	{
		name:"Town Mayor",
		desc:"I'm Bartholemew and I run this here town! Would you be willing to donate some gold pieces to help our little town grow?",
		type:"community",
		stock: 
			[
				{
					name:"Medium Sized Dock",
					cost:1000,
					desc:"Upgrade the dock to a medium sized dock, capable of harboring medium sized ships",
					stock:1
				},
				{
					name:"Large Dock",
					cost:7500,
					desc:"Upgrade the dock to a large sized dock, capable of harboring large ships.",
					stock:1
				},
				{
					name:"Improve Trade Routes",
					cost:2500,
					desc:"Pave the way for more storeowners to open up shop in town, allowing a larger selection of stores. Also improves item selection in some current stores, and refreshes stock.",
					stock:1
				},
				{
					name:"Refresh store stock",
					cost:3000,
					desc:"Refreshes the item stock levels in existing stores.",
					stock:-1
				}
			]
	},
	{
		name:"Astrologian",
		desc:"Hello traveller, I am Elune the astrologian. I can bestow a blessing on to you, but let it be known that you can receive only <strong>one</strong> blessing at a time. Choose wisely.",
		type:"personal",
		stock:
			[
				{
					name:"Blessings of the sun",
					cost:500,
					desc:"Every morning you gain one <strong>Inspiration</strong> that can be spent at any time during the day. If unspent, you do not gain an additional inspiration the next morning. Use it or lose it.",
					stock:3
				},
				{
					name:"Blessings of the moon",
					cost:750,
					desc:"The night before an expedition you will receive a vision from a random deity providing insight to your expedition.",
					stock:2
				}
			],
		stock_updated:
			[
				{
					name:"Blessings of the stars",
					cost:500,
					desc:"After receiving this blessing, the next time the recipient is at deaths door they will be exempt from the rules of death. The blessing will vanish after its usage, and the recipient has no control over it being used.",
					stock:5
				}
			]
	},
	{
		name:"Shipwright",
		type:"community",
		desc:"Hey. Jim's the name. I build and upgrade boats. What else do you want?",
		stock:
			[
				{
					name:"1x Upgrade to Medium sized Boat",
					cost:1000,
					desc:"Upgrades an existing boat to a medium sized boat. A medium sized boat can safely hold up to 4 occupants, and can dock at small or medium ports.",
					stock:3
				},
				{
					name:"1x Upgrade to Large Boat",
					cost:5000,
					desc:"Upgrades an existing medium sized boat to a large boat. A Large boat can safely hold up to 8 occupants, and can dock at large or medium ports. It can also anchor at sea and dispatch a single small boat capable of holding 2 occupants.",
					stock:3
				}
			],
	},
	{
		name:"Apothecary",
		desc:"I'm Lilliane, the town apothecary! I hope my potions can help you along your journey, traveller! Let me know if there's anything else I can do to help!",
		type:"dm",
		stock:
			[
				{
					name:"Potion of Healing",
					cost:50,
					desc:"You regain <strong>2d4 + 2</strong> Hit Points when you drink this potion. Whatever its potency, the potion's red liquid glimmers when agitated."
				},
				{
					name:"Potion of Climbing",
					cost:50,
					desc:"When you drink this potion, you gain a climbing speed equal to your walking speed for 1 hour. During this time, you have advantage on Strength (Athletics) checks you make to climb. The potion is separated into brown, silver, and gray layers resembling bands of stone. Shaking the bottle fails to mix the colors."
				},
				{
					name:"Potion of Animal Friendship",
					cost:100,
					desc:"When you drink this potion, you can cast the Animal Friendship spell (save DC 13) for 1 hour at will. Agitating this muddy liquid brings little bits into view: a fish scale, a hummingbird tongue, a cat claw, or a squirrel hair."
				},
				{
					name:"Potion of Gaseous Form",
					cost:500,
					desc:"When you drink this potion, you gain the Effect of the Gaseous Form spell for 1 hour (no Concentration required) or until you end the Effect as a bonus Action. This potion's container seems to hold fog that moves and pours like water."
				},
				{
					name:"Potion of Water Breathing",
					cost:500,
					desc:"You can breathe Underwater for 1 hour after drinking this potion. Its cloudy green fluid smells of The Sea and has a jellyfish-like bubble floating in it."
				},
				{
					name:"Potion of Heroism",
					cost:500,
					desc:"For 1 hour after drinking it, you gain 10 temporary Hit Points that last for 1 hour. For the same Duration, you are under the Effect of the bless spell (no Concentration required). This blue potion bubbles and steams as if boiling."
				},
				{
					name:"Potion of Poison",
					cost:500,
					desc:"This concoction looks, smells, and tastes like a potion of Healing or other beneficial potion. However, it is actually poison masked by Illusion magic. An Identify spell reveals its true Nature. <br><br>If you drink it, you take 3d6 poison damage, and you must succeed on a DC 13 Constitution saving throw or be Poisoned. At the start of each of your turns while you are Poisoned in this way, you take 3d6 poison damage. At the end of each of your turns, you can repeat the saving throw. On a successful save, the poison damage you take on your subsequent turns decreases by 1d6. The poison ends when the damage decreases to 0."
				}
			]
	},
	{
		name:"Adventurer Supplies",
		desc:"I'm William, and I run the supply shop here on the island! My stock isn't fantastic, but I hope you can find what you're looking for.",
		type:"dm",
		stock:
			[
				{
					name:"Light Leather Armour",
					cost:20,
					desc:"The breastplate and shoulder protectors of this armor are made of leather that has been stiffened by being boiled in oil. The rest of the armor is made of softer and more flexible materials."
				},
				{
					name:"Medium Hide Armour",
					cost:20,
					desc:"This crude armor consists of thick furs and pelts. It is commonly worn by barbarian tribes, evil humanoids, and other folk who lack access to the tools and materials needed to create better armor."
				},
				{
					name:"Steel Dagger",
					cost:20,
					desc:"A knife with a very sharp point and usually two sharp edges. Proficiency with a dagger allows you to add your proficiency bonus to the attack roll for any attack you make with it."
				},
				{
					name:"Steel Handaxe",
					cost:20,
					desc:"A wood composite handle with a sharp edged head (called a 'bit'), typically made of iron or steel. Proficiency with a handaxe allows you to add your proficiency bonus to the attack roll for any attack you make with it."
				},
				{
					name:"Steel Quarterstaff",
					cost:20,
					desc:"A staff of wood from 6 to 9 feet (about 2 to 3 m) long, used for attack and defense. Proficiency with a quarterstaff allows you to add your proficiency bonus to the attack roll for any attack you make with it."
				},
				{
					name:"Light Crossbow",
					cost:50,
					desc:"A ranged weapon that uses an elastic launching device consisting of a bow-like assembly mounted horizontally on a main frame. Proficiency with a light crossbow allows you to add your proficiency bonus to the attack roll for any attack you make with it."
				},
				{
					name:"Shortbow",
					cost:50,
					desc:"The shortbow is a flexible shaft of wood (or horn or bone) about 3 to 4 feet long with the ends connected by strong cord or a gut string that is a little shorter than the shaft, causing the wood to bend and keep the string under tension. Proficiency with a shortbow allows you to add your proficiency bonus to the attack roll for any attack you make with it."
				},
				{
					name:"Longbow",
					cost:100,
					desc:"A tall bow – roughly equal to the height of the user – allowing the archer a fairly long draw. Its limbs are relatively narrow and are circular or D-shaped in cross section. Proficiency with a longbow allows you to add your proficiency bonus to the attack roll for any attack you make with it."
				},
				{
					name:"Arrows",
					cost:5,
					desc:"20 arrows. Arrows are used with a weapon that has the ammunition property to make a ranged attack. Each time you attack with the weapon, you expend one piece of ammunition. Drawing the ammunition from a quiver, case, or other container is part of the attack (you need a free hand to load a one-handed weapon). At the end of the battle, you can recover half your expended ammunition by taking a minute to search the battlefield."
				},
				{
					name:"Crossbow Bolts",
					cost:5,
					desc:"20 crossbow bolts. Crossbow bolts are used with a weapon that has the ammunition property to make a ranged attack. Each time you attack with the weapon, you expend one piece of ammunition. Drawing the ammunition from a quiver, case, or other container is part of the attack (you need a free hand to load a one-handed weapon). At the end of the battle, you can recover half your expended ammunition by taking a minute to search the battlefield."
				},
				{
					name:"Quiver",
					cost:10,
					desc:"A quiver can hold up to 20 arrows or crossbow bolts."
				},
				{
					name:"Grappling Hook",
					cost:50,
					desc:"When tied to the end of a rope, a grappling hook can secure the rope to a battlement, window ledge, tree limb, or other protrusion. 25ft rope length."
				},
			]
	},
	{
		name:"Blacksmith",
		desc:"Call me Big Dave, I'm the blacksmith around here. I'm so proud of my gear that I offer you a deal, if you die wearing my armour you get your money back! Ha ha ha!",
		type:"dm",
		stock:
			[
				{
					name:"Shield",
					cost:20,
					desc:"A shield is made from wood or metal and is carried in one hand. Wielding a shield increases your Armor Class by 2. You can benefit from only one shield at a time."
				},	
				{
					name:"Light Studded Leather Armour",
					cost:100,
					desc:"Made from tough but flexible leather, studded leather is reinforced with close-set rivets or spikes."
				},	
				{
					name:"Steel Chain Shirt",
					cost:100,
					desc:"Made of interlocking metal rings, a chain shirt is worn between layers of clothing or leather. This armor offers modest protection to the wearer's upper body and allows the sound of the rings rubbing against one another to be muffled by outer layers."
				},	
				{
					name:"Steel Chain Mail",
					cost:200,
					desc:"Made of interlocking metal rings, chain mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows. The suit includes gauntlets."
				},	
				{
					name:"Steel Scale Mail",
					cost:200,
					desc:"This armor consists of a coat and leggings (and perhaps a separate skirt) of leather covered with overlapping pieces of metal, much like the scales of a fish. The suit includes gauntlets."
				},	
				{
					name:"Steel Breastplate",
					cost:800,
					desc:"This armor consists of a fitted metal chest piece worn with supple leather. Although it leaves the legs and arms relatively unprotected, this armor provides good protection for the wearer's vital organs while leaving the wearer relatively unencumbered."
				},	
				{
					name:"Steel Half Plate",
					cost:1500,
					desc:"Half plate consists of shaped metal plates that cover most of the wearer's body. It does not include leg protection beyond simple greaves that are attached with leather straps."
				},	
				{
					name:"Steel Full Plate",
					cost:3200,
					desc:"Plate consists of shaped, interlocking metal plates to cover the entire body. A suit of plate includes gauntlets, heavy leather boots, a visored helmet, and thick layers of padding underneath the armor. Buckles and straps distribute the weight over the body."
				},	
				{
					name:"Steel Javelin",
					cost:50,
					desc:"A javelin is a light spear designed primarily to be thrown. Proficiency with a javelin allows you to add your proficiency bonus to the attack roll for any attack you make with it."
				},	
				{
					name:"Steel Spear",
					cost:50,
					desc:"A pole weapon consisting of a shaft, usually of wood, with a pointed head. Proficiency with a spear allows you to add your proficiency bonus to the attack roll for any attack you make with it."
				},	
				{
					name:"Steel Flail",
					cost:150,
					desc:"A flail consists of a 2 feet long haft connected to a chain ending with a heavy metal ball or rod. This ball or rod was often spiked. Proficiency with a flail allows you to add your proficiency bonus to the attack roll for any attack you make with it."
				},	
				{
					name:"Steel Greataxe",
					cost:150,
					desc:"A large, heavy battleaxe with a double-bladed head. The shaft was usually constructed of stout wood. Proficiency with a greataxe allows you to add your proficiency bonus to the attack roll for any attack you make with it."
				},	
				{
					name:"Steel Shortsword",
					cost:100,
					desc:"A smaller version of the longsword, but longer than a dagger or dirk. It has a 12 to 20 inch, double-edged blade that ends in a sharp point. It has a cross-guard, grip, and pommel. Proficiency with a shortsword allows you to add your proficiency bonus to the attack roll for any attack you make with it."
				},	
				{
					name:"Steel Greatsword",
					cost:200,
					desc:"A large sword that has a double-edged blade and requires two hands to wield, with an elongated hilt to accommodate the extra grip. Proficiency with a greatsword allows you to add your proficiency bonus to the attack roll for any attack you make with it."
				},	
			]
	},
	{
		name:"Wonders and Worries",
		desc:"Ho ho, thank you for stepping into my store traveller. Here we have an assortment of... fantastic things! There's no curses on any of my items, guaranteed!",
		type:"dm",
		stock:
			[
				{
					name:"All or Nothing Coin",
					cost:500,
					desc:"On a roll you would normally use a d20, flip a coin instead. Heads is a critical success (Natural 20), tails is a critical fail (Natural 1). Can be used once per short rest.",
					stock:2
				},
				{
					name:"Dust of De-Appearance",
					cost:500,
					desc:"Can make things invisible, but wears off if the object moves, is moved, or even wiggles a bit. Best used on inanimate objects or people who can hold really, really, still.",
					stock:1
				},
				{
					name:"Paired Scrolls",
					cost:500,
					desc:"As long as the scrolls are on the same plane, whatever is written on one scroll, appears on the other. Each scrolls can 'transmit' up to two sentences before becoming inactive for 24 hours. After 24 hours, anything written on the scrolls fade.",
					stock:2
				},
				{
					name:"Mighty Acorn",
					cost:500,
					desc:"When thrown on a patch of earth, at least 5 feet wide, it immediately grows into a 20' oak.",
					stock:1
				},
				{
					name:"Silver Handkerchief",
					cost:500,
					desc:"A 12 inch piece of silver fabric. When a command word is spoken, the fabric immediately flattens and becomes as hard as steel. A second command word reverts the handkerchief back to the fabric form.",
					stock:1
				},
				{
					name:"Ring of Tracking",
					cost:500,
					desc:"A simple ring, when attuned to a user, the user knows the location of the ring at all times. Often used by merchants and collectors to keep track of their goods.",
					stock:1
				},
				{
					name:"Dagger of Whittling",
					cost:500,
					desc:"A finely made halfling dagger. This dagger can be used to whittle a 6 inch piece of wood into a small object once per day, without any DC check. The dagger can carve small toys, figures and other items made of wood (worth 1d10 gp).",
					stock:1
				},
				{
					name:"Bottomless Mug",
					cost:500,
					desc:"A masterwork stone mug, of the highest quality. Despite being normal sized, the mug can hold 10 gallons or 40 liters of liquid.",
					stock:1
				},
				{
					name:"Everburning Torch",
					cost:500,
					desc:"This item appears to be identical to a regular torch. However, when you speak a command word it lights up with a green flame and continues burning until you speak another command word. The torch provides bright light in a 20-foot radius and dim light for an additional 20 feet. If you make a melee attack with a burning torch and hit, it deals 1 fire damage. Note: This is basically a torch with a modified continual flame (level 2) spell cast upon it.",
					stock:2
				},
				{
					name:"Flask Of Perpetual Booze",
					cost:500,
					desc:"This flask is enchanted to contain a gallon of dark whiskey that can be consumed within eight hours. If the whiskey isn't consumed in that time, it turns into brine. If empty, it takes an hour for the flask to refill.",
					stock:1
				},
				{
					name:"Ring of The Lucii",
					cost:500,
					desc:"This enchanted ring allows you to teleport to the location of your weapon, immediately grabbing the weapon as you complete your teleportation. This can be used once per long rest.",
					stock:1
				},
				{
					name:"Book of Spells",
					cost:500,
					desc:"This enchanted book contains a plethory of useful and powerful spells that can be used as a cantrip. Only one spell can be used per long rest.",
					stock:1
				},
			]
	}


];

groupLog("Shops",shops,"name");
groupLog("Unlocked Shops", shopsUnlocked,"unlocked","name");

function groupLog(name,arr,cat,cat2){
	console.group(name);
	for(i=0; i<arr.length; i++){
		console.log([i],arr[i][cat],arr[i][cat2]);
	}
	console.groupEnd(name);
	return true;
}