# Super Mario RPG

Super Mario themed role playing game that allows player to chose a character and battle the remaining enemy characters until they are all defeated or until the player's health points reach 0 or below.

## How it works

When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game. The object of the game is to defeat all of the remaining fighters. The player chooses an opponent by clicking on an enemy fighter's picture. Once chosen, the enemy will be moved to the combat area on the lower half of the screen. The player should now click the attack button to damage the defender by lowering their HP (health points). These points are displayed at the bottom of the defender's picture. The opponent will instantly counter the attack, which will cause the player's character to lose some of their HP also shown at the bottom of their picture. The player will then continue hitting the attack button until the opponent's HP is reduced to 0 or below. This will remove the defeated enemy from the combat area and the player should then choose a new opponent. The player wins the game by defeating all enemy characters and loses the game if their character's HP falls to 0 or below.

#### Design Notes

Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.
Each time the player attacks, their character's Attack Power increases by its base Attack Power. For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on). The enemy character on the other hand, only has Counter Attack Power. Unlike the player's Attack Points, Counter Attack Power never changes. No characters in the game can heal or recover Health Points. A winning player must pick their characters wisely by first fighting an enemy with low Counter Attack Power. This will allow them to grow Attack Power and to take on enemies before they lose all of their Health Points. Healing options would mess with this dynamic. Players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.

## Preview