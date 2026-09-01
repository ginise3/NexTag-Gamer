# SEMANTIC_GAME_PARAMETER_BASE.md

**Проект:** Gamer Nickname Generator  
**Назначение:** обязательное приложение к `Task.md`; стартовая семантическая база параметров генерации игровых ников  
**Статус документа:** УТВЕРЖДЁН  
**Версия:** 1.0  
**Дата утверждения:** 2026-09-01  
**Рекомендуемое расположение:** рядом с `/Task.md`

---

# 1. Статус приложения

Настоящий документ является обязательной нормативной частью:

**[Task.md](./Task.md)**

Документы должны применяться совместно.

`Task.md` определяет требования к продукту и реализации.

`SEMANTIC_GAME_PARAMETER_BASE.md` определяет нормативную предметную модель параметров, семантических групп, синонимов и стартовых правил генерации.

Агент-разработчик не имеет права самостоятельно изменять смысл утверждённой модели.

---

# 2. Назначение базы

База сформирована на основе характерных игровых параметров 20 крупных игровых экосистем:

1. Fortnite
2. Counter-Strike 2
3. Minecraft
4. Roblox
5. League of Legends
6. Valorant
7. Dota 2
8. PUBG: Battlegrounds
9. GTA Online
10. Call of Duty
11. Apex Legends
12. Rainbow Six Siege
13. Overwatch
14. Marvel Rivals
15. Rust
16. Escape from Tarkov
17. World of Warcraft
18. Dead by Daylight
19. War Thunder
20. Brawl Stars

Эти игры используются только как исходный материал для формирования универсальных параметров.

Приложение не должно требовать от пользователя выбора конкретной игры.

---

# 3. Основной принцип

Из игровых экосистем извлекаются универсальные понятия:

```text
genre
setting
role
play_style
nick_style
themes
semantic_tags
```

Пользователь формирует профиль будущего ника из этих параметров.

Пример:

```text
genre = fps
setting = military
role = sniper
play_style = tactical
nick_style = dark
length = short

custom_words:
wolf
frost
```

Название конкретной игры генератору не требуется.

---

# 4. Канонический язык

Все внутренние идентификаторы базы должны быть английскими.

Пример:

```text
dark_fantasy
tactical_shooter
battle_royale
long_range
team_player
```

Для интерфейса используются локализованные подписи:

```text
label_en
label_ru
```

Пример:

```text
id: dark_fantasy
label_en: Dark Fantasy
label_ru: Тёмное фэнтези
```

---

# 5. GENRE

| ID | English | Русский |
|---|---|---|
| fps | FPS | Шутер от первого лица |
| tactical_shooter | Tactical Shooter | Тактический шутер |
| hero_shooter | Hero Shooter | Геройский шутер |
| extraction_shooter | Extraction Shooter | Экстракшен-шутер |
| battle_royale | Battle Royale | Королевская битва |
| moba | MOBA | MOBA |
| rpg | RPG | Ролевая игра |
| mmorpg | MMORPG | MMORPG |
| sandbox | Sandbox | Песочница |
| survival | Survival | Выживание |
| open_world | Open World | Открытый мир |
| action | Action | Экшен |
| strategy | Strategy | Стратегия |
| simulation | Simulation | Симулятор |
| racing | Racing | Гонки |
| sports | Sports | Спорт |
| horror | Horror | Хоррор |
| asymmetric_horror | Asymmetric Horror | Асимметричный хоррор |
| vehicle_combat | Vehicle Combat | Бои на технике |
| arena_action | Arena Action | Арена / быстрый экшен |
| creation | Creation | Создание / творчество |
| adventure | Adventure | Приключения |

Разрешается выбрать несколько совместимых жанров.

---

# 6. SETTING

| ID | English | Русский |
|---|---|---|
| modern | Modern | Современность |
| urban | Urban | Городской |
| military | Military | Военный |
| tactical | Tactical | Тактический |
| historical | Historical | Исторический |
| fantasy | Fantasy | Фэнтези |
| high_fantasy | High Fantasy | Высокое фэнтези |
| dark_fantasy | Dark Fantasy | Тёмное фэнтези |
| magic | Magic | Магический |
| mythology | Mythology | Мифология |
| sci_fi | Sci-Fi | Научная фантастика |
| futuristic | Futuristic | Будущее |
| cyberpunk | Cyberpunk | Киберпанк |
| space | Space | Космос |
| superhero | Superhero | Супергеройский |
| post_apocalypse | Post-Apocalypse | Постапокалипсис |
| wilderness | Wilderness | Дикая природа |
| horror | Horror | Хоррор |
| dark | Dark | Мрачный |
| stylized | Stylized | Стилизованный |
| block_world | Block World | Блочный мир |
| crime | Crime | Криминальный |
| survival_world | Survival World | Мир выживания |

---

# 7. ROLE

| ID | English | Русский |
|---|---|---|
| warrior | Warrior | Воин |
| fighter | Fighter | Боец |
| assault | Assault | Штурмовик |
| sniper | Sniper | Снайпер |
| marksman | Marksman | Стрелок |
| tank | Tank | Танк |
| support | Support | Поддержка |
| healer | Healer | Лекарь |
| mage | Mage | Маг |
| assassin | Assassin | Убийца |
| rogue | Rogue | Разбойник |
| hunter | Hunter | Охотник |
| ranger | Ranger | Следопыт |
| scout | Scout | Разведчик |
| commander | Commander | Командир |
| leader | Leader | Лидер |
| controller | Controller | Контроллер |
| initiator | Initiator | Инициатор |
| sentinel | Sentinel | Страж |
| duelist | Duelist | Дуэлянт |
| carry | Carry | Керри |
| jungler | Jungler | Лесник |
| defender | Defender | Защитник |
| breacher | Breacher | Штурмовик-взломщик |
| builder | Builder | Строитель |
| creator | Creator | Создатель |
| crafter | Crafter | Ремесленник |
| explorer | Explorer | Исследователь |
| survivor | Survivor | Выживший |
| raider | Raider | Рейдер |
| trader | Trader | Торговец |
| driver | Driver | Водитель |
| racer | Racer | Гонщик |
| pilot | Pilot | Пилот |
| gunner | Gunner | Стрелок техники |
| tanker | Tanker | Танкист |
| strategist | Strategist | Стратег |
| vanguard | Vanguard | Авангард |
| necromancer | Necromancer | Некромант |

Выбор роли необязателен.

---

# 8. PLAY STYLE

| ID | English | Русский |
|---|---|---|
| aggressive | Aggressive | Агрессивный |
| tactical | Tactical | Тактический |
| strategic | Strategic | Стратегический |
| defensive | Defensive | Оборонительный |
| stealth | Stealth | Скрытный |
| fast | Fast | Быстрый |
| patient | Patient | Терпеливый |
| risky | Risky | Рискованный |
| precise | Precise | Точный |
| long_range | Long Range | Дальний бой |
| close_range | Close Range | Ближний бой |
| ambush | Ambush | Засада |
| rush | Rush | Натиск |
| survivalist | Survivalist | Выживальщик |
| creative | Creative | Творческий |
| explorer | Explorer | Исследовательский |
| competitive | Competitive | Соревновательный |
| casual | Casual | Неформальный |
| solo | Solo | Одиночный |
| team | Team | Командный |
| objective_focused | Objective Focused | Игра на цель |
| adaptive | Adaptive | Адаптивный |
| chaotic | Chaotic | Хаотичный |

---

# 9. NICK STYLE

| ID | English | Русский |
|---|---|---|
| aggressive | Aggressive | Агрессивный |
| dark | Dark | Тёмный |
| mysterious | Mysterious | Загадочный |
| funny | Funny | Смешной |
| epic | Epic | Эпический |
| heroic | Heroic | Героический |
| professional | Professional | Профессиональный |
| minimal | Minimal | Минималистичный |
| clean | Clean | Чистый |
| elite | Elite | Элитный |
| scary | Scary | Страшный |
| futuristic | Futuristic | Футуристический |
| cyber | Cyber | Кибер |
| fantasy | Fantasy | Фэнтези |
| mythical | Mythical | Мифический |
| military | Military | Военный |
| cold | Cold | Холодный |
| savage | Savage | Жестокий |
| chaotic | Chaotic | Хаотичный |
| cute | Cute | Милый |
| weird | Weird | Странный |
| stylish | Stylish | Стильный |
| stealthy | Stealthy | Скрытный |
| powerful | Powerful | Мощный |
| intelligent | Intelligent | Интеллектуальный |

---

# 10. CORE THEMES

## 10.1. Darkness

```text
shadow
night
dark
void
black
ghost
phantom
dusk
eclipse
abyss
shade
```

## 10.2. Cold

```text
ice
frost
frozen
winter
snow
cryo
cold
glacier
```

## 10.3. Fire

```text
fire
flame
blaze
ember
inferno
burn
ash
heat
pyro
```

## 10.4. Power

```text
power
force
rage
fury
might
titan
alpha
prime
apex
dominant
```

## 10.5. Combat

```text
strike
frag
shot
blast
bullet
aim
scope
clutch
ace
rush
raid
breach
```

## 10.6. Predator

```text
wolf
raven
hawk
falcon
viper
cobra
panther
tiger
lion
shark
hunter
predator
```

## 10.7. Fantasy

```text
dragon
wyrm
rune
arcane
magic
spell
demon
angel
orc
elf
dwarf
knight
sword
crown
realm
```

## 10.8. Death / Horror

```text
death
dead
grave
skull
blood
bone
nightmare
terror
fear
reaper
curse
haunt
```

## 10.9. Technology

```text
cyber
nano
neon
tech
byte
code
matrix
core
zero
mech
bot
pulse
vector
```

## 10.10. Space

```text
star
nova
cosmic
galaxy
orbit
lunar
solar
moon
meteor
astro
nebula
void
```

## 10.11. Military

```text
war
strike
ops
squad
unit
armor
steel
combat
tactical
command
intel
recon
```

## 10.12. Survival

```text
survivor
raid
scrap
bunker
wasteland
stash
loot
wild
base
shelter
outcast
nomad
```

## 10.13. Speed

```text
speed
rapid
rush
dash
flash
turbo
drift
velocity
swift
quick
boost
```

## 10.14. Leadership

```text
king
queen
lord
chief
boss
alpha
commander
captain
master
leader
prime
```

## 10.15. Mystery

```text
unknown
secret
silent
hidden
masked
mystic
cryptic
riddle
echo
mirage
```

## 10.16. Chaos

```text
chaos
toxic
wild
crazy
mad
broken
anarchy
random
riot
havoc
```

## 10.17. Nature

```text
forest
storm
thunder
river
mountain
stone
earth
ocean
wave
wind
thorn
```

## 10.18. Creation

```text
build
craft
forge
maker
create
block
mine
design
construct
architect
```

---

# 11. SEMANTIC SYNONYMS

## sniper

```text
sniper
marksman
sharpshooter
longshot
shooter
```

Нормализация:

```text
role = sniper
semantic_tags:
precision
scope
distance
silent
cold
```

## aggressive

```text
aggressive
brutal
fierce
savage
violent
hard
rush
```

Нормализация:

```text
play_style = aggressive
semantic_tags:
rage
attack
rush
power
```

## stealth

```text
stealth
silent
hidden
covert
sneaky
shadow
```

Нормализация:

```text
play_style = stealth
semantic_tags:
shadow
silent
ghost
hidden
```

## tactical

```text
tactical
smart
calculated
planned
methodical
```

Нормализация:

```text
play_style = tactical
semantic_tags:
precision
intel
control
strategy
```

## dark

```text
dark
black
shadow
night
gloom
void
```

Нормализация:

```text
nick_style = dark
```

## fast

```text
fast
quick
rapid
speed
swift
rush
```

Нормализация:

```text
play_style = fast
semantic_tags:
velocity
flash
dash
rapid
```

## powerful

```text
power
strong
powerful
mighty
dominant
brutal
```

Нормализация:

```text
nick_style = powerful
semantic_tags:
force
titan
prime
alpha
```

## funny

```text
funny
joke
crazy
silly
meme
weird
```

Нормализация:

```text
nick_style = funny
```

---

# 12. GAME SOURCE PROFILES

Эти профили используются только для происхождения базы и контроля покрытия.

Они не являются обязательным пользовательским интерфейсом.

## 12.1. Fortnite

```text
genres:
battle_royale
action

settings:
modern
stylized
futuristic

roles:
assault
sniper
builder
support

play_styles:
fast
creative
aggressive
tactical
solo
team

themes:
storm
build
loot
island
victory
rush
```

## 12.2. Counter-Strike 2

```text
genres:
fps
tactical_shooter

settings:
modern
tactical

roles:
sniper
assault
support
commander
scout

play_styles:
tactical
precise
aggressive
stealth
team

themes:
aim
scope
clutch
ace
rush
smoke
flash
strike
```

## 12.3. Minecraft

```text
genres:
sandbox
survival
creation
adventure

settings:
block_world
fantasy
wilderness

roles:
builder
creator
crafter
explorer
survivor

play_styles:
creative
survivalist
patient
explorer
casual

themes:
block
mine
craft
forge
stone
diamond
cave
build
```

## 12.4. Roblox

```text
genres:
sandbox
creation
action

settings:
stylized
modern
fantasy
futuristic

roles:
creator
builder
explorer
racer

play_styles:
creative
casual
competitive
team
solo

themes:
avatar
build
create
speed
arena
adventure
```

## 12.5. League of Legends

```text
genres:
moba

settings:
fantasy
magic

roles:
tank
mage
support
marksman
assassin
fighter
jungler

play_styles:
strategic
competitive
team
fast
objective_focused

themes:
rune
magic
blade
shadow
dragon
arcane
crown
```

## 12.6. Valorant

```text
genres:
fps
tactical_shooter
hero_shooter

settings:
modern
futuristic
tactical

roles:
duelist
controller
initiator
sentinel
sniper

play_styles:
tactical
precise
aggressive
team
stealth

themes:
aim
pulse
shadow
strike
clutch
ace
intel
```

## 12.7. Dota 2

```text
genres:
moba

settings:
fantasy
magic
dark_fantasy

roles:
carry
support
tank
mage
assassin
initiator

play_styles:
strategic
competitive
team
aggressive
adaptive

themes:
arcane
rune
chaos
blade
shadow
ancient
magic
```

## 12.8. PUBG: Battlegrounds

```text
genres:
battle_royale
tactical_shooter

settings:
modern
military

roles:
assault
sniper
scout
support

play_styles:
tactical
patient
survivalist
aggressive
team
solo

themes:
survival
scope
loot
squad
zone
drop
strike
```

## 12.9. GTA Online

```text
genres:
open_world
action
racing

settings:
modern
urban
crime

roles:
driver
racer
leader
trader

play_styles:
chaotic
fast
competitive
team
solo

themes:
street
speed
drift
cash
crew
outlaw
boss
heist
```

## 12.10. Call of Duty

```text
genres:
fps
tactical_shooter

settings:
military
modern
futuristic

roles:
assault
sniper
support
scout

play_styles:
aggressive
fast
tactical
competitive
team

themes:
ops
strike
war
squad
scope
rush
combat
```

## 12.11. Apex Legends

```text
genres:
battle_royale
hero_shooter
fps

settings:
sci_fi
futuristic

roles:
assault
support
scout
controller

play_styles:
fast
aggressive
tactical
team
adaptive

themes:
apex
arena
pulse
storm
hunter
speed
future
```

## 12.12. Rainbow Six Siege

```text
genres:
tactical_shooter
fps

settings:
modern
military
tactical

roles:
breacher
defender
scout
support
sniper

play_styles:
tactical
defensive
stealth
team
precise

themes:
breach
intel
drone
shield
strike
recon
silent
```

## 12.13. Overwatch

```text
genres:
hero_shooter
fps

settings:
sci_fi
futuristic
stylized

roles:
tank
fighter
support
healer

play_styles:
fast
team
competitive
adaptive
objective_focused

themes:
hero
pulse
mech
guardian
future
blast
energy
```

## 12.14. Marvel Rivals

```text
genres:
hero_shooter
action

settings:
superhero
sci_fi
fantasy

roles:
vanguard
duelist
strategist
support

play_styles:
fast
team
aggressive
strategic
adaptive

themes:
hero
cosmic
power
titan
storm
magic
energy
```

## 12.15. Rust

```text
genres:
survival
sandbox

settings:
post_apocalypse
wilderness
survival_world

roles:
survivor
builder
crafter
raider

play_styles:
survivalist
aggressive
stealth
risky
solo
team

themes:
scrap
metal
raid
base
bunker
wild
outcast
```

## 12.16. Escape from Tarkov

```text
genres:
extraction_shooter
tactical_shooter
fps

settings:
modern
military
dark

roles:
sniper
raider
survivor
trader
scout

play_styles:
tactical
patient
stealth
survivalist
precise

themes:
raid
extraction
stash
loot
bunker
scope
silent
```

## 12.17. World of Warcraft

```text
genres:
mmorpg
rpg

settings:
high_fantasy
dark_fantasy
magic

roles:
warrior
mage
rogue
hunter
healer
tank
support
necromancer

play_styles:
strategic
team
solo
competitive
explorer

themes:
dragon
rune
arcane
shadow
holy
frost
fire
nature
crown
```

## 12.18. Dead by Daylight

```text
genres:
asymmetric_horror
survival
horror

settings:
horror
dark

roles:
survivor
hunter

play_styles:
stealth
ambush
team
survivalist
fast

themes:
fog
nightmare
blood
fear
shadow
hunt
escape
curse
```

## 12.19. War Thunder

```text
genres:
vehicle_combat
simulation
action

settings:
military
historical
modern

roles:
pilot
tanker
gunner
commander

play_styles:
tactical
precise
team
patient
competitive

themes:
steel
armor
jet
cannon
war
squadron
storm
strike
```

## 12.20. Brawl Stars

```text
genres:
arena_action
hero_shooter
action

settings:
stylized

roles:
fighter
tank
support
assassin
controller
marksman

play_styles:
fast
chaotic
team
competitive
casual
aggressive

themes:
star
blast
rush
arena
power
speed
chaos
```

---

# 13. CROSS-GAME SEMANTIC GROUPS

## Precision

Входные понятия:

```text
sniper
marksman
precise
long_range
scope
aim
```

Semantic pool:

```text
scope
zero
vector
focus
edge
point
hawk
falcon
cold
silent
```

## Aggression

Входные понятия:

```text
assault
fighter
aggressive
rush
close_range
```

Semantic pool:

```text
rage
fury
strike
blast
savage
brutal
rush
fang
claw
fire
```

## Stealth

Входные понятия:

```text
stealth
assassin
rogue
scout
ambush
```

Semantic pool:

```text
shadow
ghost
silent
night
shade
phantom
veil
hidden
raven
```

## Magic

Входные понятия:

```text
mage
magic
fantasy
dark_fantasy
necromancer
```

Semantic pool:

```text
arcane
rune
hex
spell
void
frost
flame
wyrm
mystic
curse
```

## Technology

Входные понятия:

```text
sci_fi
futuristic
cyber
pilot
controller
```

Semantic pool:

```text
cyber
nano
vector
zero
core
pulse
byte
neon
mech
nova
```

## Survival

Входные понятия:

```text
survival
survivor
raider
survivalist
post_apocalypse
```

Semantic pool:

```text
raid
scrap
wild
bunker
nomad
outcast
steel
ash
waste
scar
```

## Leadership

Входные понятия:

```text
commander
leader
strategist
vanguard
```

Semantic pool:

```text
alpha
prime
lord
chief
crown
command
king
master
apex
```

## Speed

Входные понятия:

```text
fast
racer
driver
rush
```

Semantic pool:

```text
rapid
dash
flash
swift
velocity
turbo
drift
boost
storm
```

---

# 14. GENERATION MODIFIERS

## Short

Предпочтительная длина:

```text
4–8 characters
```

Примеры трансформаций:

```text
shadow → shad
dragon → drak
frost → frox
vector → vex
```

## Medium

```text
7–12 characters
```

Примеры:

```text
NoxHunter
FrostVex
ShadowAim
```

## Long

```text
10–16 characters
```

Примеры:

```text
SilentWarden
FrostReaper
ShadowVector
```

---

# 15. WORD TRANSFORMATION RULES

Допустимые механизмы:

```text
prefix addition
suffix addition
vowel mutation
consonant mutation
controlled shortening
word fusion
syllable fusion
semantic substitution
phonetic variation
number suffix
```

Примеры:

```text
dragon → drak
dragon → drax
dragon → drayn

shadow → shad
shadow → shadox
shadow → nox

frost → frox
frost → kryo
frost → cryon

wolf → wulf
wolf → wolx
wolf → dire
```

Необходимо избегать полной случайной порчи исходного слова.

---

# 16. PREFIX POOL

Стартовый набор:

```text
neo
nox
dark
void
zero
x
vex
cry
nova
iron
night
alpha
ultra
hyper
```

Префиксы не должны применяться механически ко всем результатам.

---

# 17. SUFFIX POOL

Стартовый набор:

```text
x
ex
ix
ox
on
or
ar
yn
ion
core
prime
zero
one
```

Использование зависит от желаемого стиля.

---

# 18. NUMBER RULES

Если пользователь разрешил цифры, допускается использование:

```text
0
1
7
13
21
42
47
77
99
101
404
777
```

Числа не должны добавляться ко всем вариантам.

Числа, введённые самим пользователем, имеют более высокий приоритет.

---

# 19. CUSTOM WORD PRIORITY

Пользовательские слова должны иметь высокий вес.

Если пользователь ввёл:

```text
wolf
frost
```

генератор не обязан использовать оба слова буквально, но значительная часть результатов должна быть связана с ними.

Допустимые примеры:

```text
FrostWolf
FroxWulf
CryoFang
Wolx
DireFrost
IceHowl
```

---

# 20. UNKNOWN CUSTOM WORD

Неизвестное английское слово:

```text
Vornek
```

должно сохраняться.

Возможные операции:

```text
Vornek
Vornex
VorNik
Vorek
NekVor
VorX
```

Запрещено удалять слово только потому, что его нет в словаре.

---

# 21. PARAMETER WEIGHTS

Предлагаемый стартовый приоритет:

```text
custom_words        = 1.00
nick_style          = 0.90
role                = 0.80
setting             = 0.70
play_style          = 0.65
genre               = 0.50
```

Это не обязательные математические коэффициенты реализации.

Их смысл:

> Чем ближе параметр к личному пожеланию пользователя, тем сильнее он должен влиять на результат.

Custom Words имеют максимальный приоритет.

---

# 22. CONFLICT RESOLUTION

Если параметры кажутся противоречивыми:

```text
nick_style = cute
play_style = aggressive
setting = horror
```

генератор не должен считать профиль ошибочным.

Допустим смешанный стиль:

```text
CuteFang
TinyHex
PinkReaper
BunnyVoid
```

Противоречивые параметры могут использоваться как источник оригинальности.

---

# 23. STANDARD PARAMETER SELECTION

Ни один смысловой параметр не является обязательным.

Допустим:

```text
role = sniper
```

без Genre и Setting.

Или:

```text
nick_style = dark
custom_words = wolf
```

Генерация должна работать.

---

# 24. BASE COVERAGE

Стартовая база должна позволять описывать типичные профили игроков из всех 20 использованных игровых экосистем:

```text
competitive shooter
tactical shooter
battle royale
MOBA
RPG
MMORPG
sandbox
survival
open-world
hero shooter
horror
vehicle combat
creative game
arena action
```

При этом система не должна быть ограничена этими играми.

---

# 25. EXTENSION RULE

Новый параметр добавляется только если:

1. он имеет самостоятельный смысл;
2. его нельзя нормально выразить существующими значениями;
3. он потенциально применим более чем к одной игре или игровому стилю.

Не добавлять в основную модель уникальные названия конкретных персонажей, оружия, карт или предметов одной игры.

---

# 26. SOURCE-GAME RULE

Названия конкретных игр не используются как часть генерации по умолчанию.

Например сочетание:

```text
fps
tactical
sniper
precise
dark
```

не должно автоматически создавать:

```text
CS2Sniper
CounterWolf
```

если пользователь сам не ввёл соответствующее слово.

---

# 27. COPYRIGHT / BRAND SAFETY RULE

По умолчанию генератор должен предпочитать универсальные игровые понятия.

Не использовать автоматически:

- имена игровых персонажей;
- названия торговых марок;
- названия конкретных карт;
- названия уникального игрового оружия;
- защищённые названия игровых фракций.

Конкретное название игры используется только как источник понимания игрового направления при проектировании базы.

---

# 28. MVP DATABASE STRUCTURE

Логически база должна позволять представить:

```text
ParameterCategory
ParameterValue
SemanticTag
Synonym
SemanticGroup
GenerationRule
```

Минимальные связи:

```text
ParameterValue
    ↓
SemanticTag

Synonym
    ↓
ParameterValue

SemanticTag
    ↓
SemanticGroup

SemanticGroup
    ↓
Generation vocabulary
```

---

# 29. ПРИМЕР ПОЛНОГО ПРОФИЛЯ

Пользователь выбирает:

```text
Genre:
RPG

Setting:
Dark Fantasy

Role:
Necromancer

Play Style:
Strategic

Nick Style:
Mysterious

Length:
Short

Additional words:
dragon
frost
```

Внутренний профиль:

```text
genre = rpg
setting = dark_fantasy
role = necromancer
play_style = strategic
nick_style = mysterious
length = short

custom_words:
dragon
frost

semantic_groups:
magic
darkness
cold
fantasy
```

Возможная выдача:

```text
FroxDrak
NoxWyrm
CryHex
Drayn
FrostNox
VyrmX
RuneFrox
DrakVoid
```

---

# 30. ПРИМЕР FPS

```text
Genre:
FPS

Role:
Sniper

Play Style:
Tactical

Nick Style:
Professional

Additional words:
hawk
```

Semantic profile:

```text
precision
long_range
scope
tactical
hawk
clean
```

Возможные результаты:

```text
HawkVex
ZeroHawk
Hawx
ScopeX
FalconV
Vektor
HawkOne
```

---

# 31. ПРИМЕР SURVIVAL

```text
Genre:
Survival

Setting:
Post-Apocalypse

Role:
Raider

Play Style:
Solo

Nick Style:
Dark

Additional words:
ash
```

Возможные результаты:

```text
AshRaid
NoxAsh
ScrapX
VoidNomad
AshVorn
DarkBunker
RavAsh
```

---

# 32. ПРИМЕР НЕОБЫЧНОЙ КОМБИНАЦИИ

```text
Role:
Healer

Play Style:
Aggressive

Nick Style:
Scary

Additional words:
angel
```

Возможные результаты:

```text
RageAngel
GrimHalo
HexAngel
DarkMedic
FuryHalo
AngelVex
```

Система должна поддерживать подобные комбинации.

---

# 33. РЕКОМЕНДУЕМЫЙ ТЕХНИЧЕСКИЙ ФОРМАТ

После утверждения агент может преобразовать базу в структуру наподобие:

```text
data/
    genres.json
    settings.json
    roles.json
    play_styles.json
    nick_styles.json
    themes.json
    synonyms.json
    semantic_groups.json
    generation_rules.json
```

или эквивалентное локальное хранилище, соответствующее текущей архитектуре приложения.

Технический формат не должен менять предметную модель настоящего документа.

---

# 34. ГЛАВНЫЙ ПРИНЦИП

База отвечает на вопрос:

> Какие характеристики игрового мира, игрока и желаемого образа могут влиять на создание ника?

Она не отвечает на вопрос:

> Для какой конкретно игры создаётся ник?

Именно это делает Gamer Nickname Generator независимым от каталога конкретных игр и позволяет использовать одну модель для существующих и будущих игр.

---

# 35. Статус

**Документ утверждён.**

Версия `1.0` является обязательным приложением к `Task.md`.

Изменение нормативной предметной модели требует отдельного продуктового решения.
