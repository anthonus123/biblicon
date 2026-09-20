// Pericope -> the Orthodox iconographic subject a passage of Luke would carry.
// tier a = an icon of THIS scene exists in Orthodox iconography
// tier b = the Church attaches a type icon to the passage without depicting its verses
// tier c = no traditional icon; keep the plain verse row
// kw = keywords matched against the harvested Byzantine/Orthodox pool by src/tools/.
//
// Luke is the one Gospel whose own material the shared pool cannot supply. Matthew and John
// tell nothing of the Annunciation to Zacharias, the Annunciation to the Theotokos, the
// Visitation, the Nativity of the Forerunner, the Circumcision, the Meeting in the Temple,
// Christ at twelve years, Emmaus or the Ascension — and every one of those is a feast of the
// Church with an icon of its own, so this is the most findable search this project has had.
// What Luke shares with Matthew and Mark (the Theophany, the Transfiguration, the Passion)
// is already in the pool, but each file still has to be read against LUKE's verses: he alone
// gives the thief on the right hand, the bloody sweat, and the women of Jerusalem.
//
// The parables are the opposite case. HANDOFF records two dedicated searches proving Orthodox
// programmes do not paint them, with the Ferapontov frescoes of Dionisy the one exception —
// and Luke's parables (the Prodigal, the Rich Man and Lazarus, the Pharisee and the Publican,
// the Good Samaritan) are the few that Orthodox painting does take up, because the Triodion
// reads three of them on its preparatory Sundays.
module.exports = {
 // ---- chapter 1 ----
 prologue:        {tier:'b', subj:'St Luke the Evangelist writing his Gospel', kw:[['luke','evangelist'],['loukas'],['evangelist','writing']]},
 zacharias:       {tier:'a', subj:'The Annunciation to Zacharias at the altar of incense', kw:[['zacharias'],['zachariah'],['annunciation','zacharias']]},
 annunciation:    {tier:'a', subj:'The Annunciation to the Theotokos', kw:[['annunciation'],['evangelismos'],['gabriel','mary']]},
 visitation:      {tier:'a', subj:'The Visitation — the embrace of the Theotokos and St Elisabeth', kw:[['visitation'],['aspasmos'],['elisabeth'],['elizabeth','mary']]},
 magnificat:      {tier:'c', subj:'', kw:[]},
 forerunnerbirth: {tier:'a', subj:'The Nativity of St John the Forerunner', kw:[['nativity','baptist'],['birth','john'],['gennesis','prodromou']]},
 benedictus:      {tier:'c', subj:'', kw:[]},

 // ---- chapter 2 ----
 nativity:        {tier:'a', subj:'The Nativity of Christ', kw:[['nativity'],['christmas'],['gennesis'],['birth','christ']]},
 shepherds:       {tier:'a', subj:'The angel and the shepherds at the Nativity', kw:[['shepherd'],['poimen','angel']]},
 circumcision:    {tier:'a', subj:'The Circumcision of Christ', kw:[['circumcision'],['peritome']]},
 meeting:         {tier:'a', subj:'The Meeting of the Lord in the Temple — the Hypapante', kw:[['presentation','temple'],['hypapante'],['ypapanti'],['simeon']]},
 nazareth:        {tier:'c', subj:'', kw:[]},
 twelveyears:     {tier:'a', subj:'Christ at twelve years among the doctors in the Temple', kw:[['twelve','temple'],['doctors'],['among','elders']]},

 // ---- chapter 3 ----
 // Wired 2026-09-20d to the Angel of the Desert, which is the Forerunner himself and not a
 // scene from these verses — tier b, as the same file is in Mark. The preaching itself is
 // painted at `fruits` below.
 forerunnerpreach:{tier:'b', subj:'St John the Forerunner, the Angel of the Desert', kw:[['forerunner','preach'],['prodromos'],['baptist','wilderness']]},
 // The Dionysiou fresco of the Forerunner teaching sets SOLDIERS on his right hand, and 3:14
 // is the only place in the four Gospels where soldiers come to John. Wired 2026-09-20d.
 fruits:          {tier:'a', subj:'St John the Forerunner teaching the multitude, the publicans and the soldiers', kw:[['forerunner','preach'],['prodromos','didaskon'],['baptist','teaching']]},
 mightier:        {tier:'c', subj:'', kw:[]},
 baptism:         {tier:'a', subj:'The Theophany — the Baptism of Christ in Jordan', kw:[['baptism'],['theophan'],['jordan'],['baptisis']]},
 genealogy:       {tier:'c', subj:'', kw:[]},

 // ---- chapter 4 ----
 temptation:      {tier:'a', subj:'Christ tempted in the wilderness', kw:[['temptation'],['tempted'],['peirasmos']]},
 synagogue:       {tier:'a', subj:'Christ reading in the synagogue at Nazareth', kw:[['synagogue'],['nazareth','scroll'],['isaiah','scroll']]},
 noprophet:       {tier:'c', subj:'', kw:[]},
 capernaum:       {tier:'a', subj:'The unclean spirit cast out in the synagogue at Capernaum', kw:[['daimon'],['demoniac'],['unclean','spirit'],['exorcis']]},
 petersmother:    {tier:'a', subj:'The healing of Simon’s wife’s mother', kw:[['mother','law'],['peter','fever'],['penthera']]},
 preaching:       {tier:'c', subj:'', kw:[]},

 // ---- chapter 5 ----
 draught:         {tier:'a', subj:'The miraculous draught of fishes and the calling of Peter', kw:[['draught','fish'],['fisher'],['nets'],['klesis']]},
 leper:           {tier:'a', subj:'The cleansing of the leper', kw:[['leper'],['lepros'],['leprosy']]},
 paralytic:       {tier:'a', subj:'The paralytic let down through the tiles', kw:[['paralyt'],['paralyton']]},
 levi:            {tier:'b', subj:'The calling of Levi at the receipt of custom', kw:[['matthew','call'],['levi'],['publican']]},
 fasting:         {tier:'c', subj:'', kw:[]},

 // ---- chapter 6 ----
 sabbath:         {tier:'c', subj:'', kw:[]},
 witheredhand:    {tier:'a', subj:'The healing of the withered hand on the sabbath', kw:[['withered'],['xeran'],['hand','sabbath']]},
 twelve:          {tier:'b', subj:'The Synaxis of the Holy Apostles', kw:[['synaxis'],['twelve','apostle'],['apostolon']]},
 // Settled 2026-09-20d: `IkonaZapovediBlazhenGIM`, the one Beatitudes icon in the pool, is a
 // Russian panel of NINE scenes, one to a beatitude — Matthew's nine. Luke gives four
 // blessings and four woes, so the icon does not paint these verses. Stays tier c.
 beatitudes:      {tier:'c', subj:'', kw:[]},
 loveenemies:     {tier:'c', subj:'', kw:[]},
 judgenot:        {tier:'c', subj:'', kw:[]},
 houserock:       {tier:'c', subj:'', kw:[]},

 // ---- chapter 7 ----
 centurion:       {tier:'a', subj:'The healing of the centurion’s servant', kw:[['centurion'],['ekatontarch']]},
 nain:            {tier:'a', subj:'The raising of the widow’s son at Nain', kw:[['nain'],['widow','son'],['chera']]},
 johnsends:       {tier:'c', subj:'', kw:[]},
 witnesstojohn:   {tier:'c', subj:'', kw:[]},
 sinfulwoman:     {tier:'a', subj:'The sinful woman anointing the feet of Christ', kw:[['sinful','woman'],['myrrh','woman'],['pornin'],['anoint']]},

 // ---- chapter 8 ----
 women:           {tier:'c', subj:'', kw:[]},
 sower:           {tier:'a', subj:'The parable of the sower', kw:[['sower'],['seed','sow']]},
 candle:          {tier:'c', subj:'', kw:[]},
 brethren:        {tier:'c', subj:'', kw:[]},
 storm:           {tier:'a', subj:'The stilling of the storm on the lake', kw:[['storm'],['tempest'],['galini'],['boat','sleep']]},
 gadarene:        {tier:'a', subj:'The Gadarene demoniac and the swine', kw:[['gadaren'],['gerasen'],['legion'],['swine']]},
 issueofblood:    {tier:'a', subj:'The woman with the issue of blood', kw:[['issue','blood'],['haemorrho'],['aimorroous']]},
 jairus:          {tier:'a', subj:'The raising of the daughter of Jairus', kw:[['jairus'],['iaeirou'],['daughter','rais']]},

 // ---- chapter 9 ----
 sending:         {tier:'c', subj:'', kw:[]},
 herod:           {tier:'c', subj:'', kw:[]},
 fivethousand:    {tier:'a', subj:'The feeding of the five thousand', kw:[['five','thousand'],['loaves'],['artous'],['multiplication']]},
 confession:      {tier:'c', subj:'', kw:[]},
 takecross:       {tier:'c', subj:'', kw:[]},
 transfiguration: {tier:'a', subj:'The Transfiguration on the mountain', kw:[['transfigur'],['metamorphos'],['tabor']]},
 dumbspirit:      {tier:'a', subj:'The healing of the boy with the unclean spirit', kw:[['lunatic'],['epilept'],['boy','spirit'],['selin']]},
 greatest:        {tier:'a', subj:'Christ setting a child in the midst', kw:[['child','midst'],['paidion']]},
 samaritanvillage:{tier:'c', subj:'', kw:[]},
 followme:        {tier:'c', subj:'', kw:[]},

 // ---- chapter 10 ----
 seventy:         {tier:'b', subj:'The Synaxis of the Seventy Apostles', kw:[['seventy','apostle'],['ebdomikonta']]},
 chorazin:        {tier:'c', subj:'', kw:[]},
 returnseventy:   {tier:'c', subj:'', kw:[]},
 thankfather:     {tier:'c', subj:'', kw:[]},
 samaritan:       {tier:'a', subj:'The parable of the Good Samaritan', kw:[['samaritan','good'],['kalos','samareit']]},
 marthamary:      {tier:'a', subj:'Christ in the house of Martha and Mary', kw:[['martha'],['mary','martha'],['bethany','house']]},

 // ---- chapter 11 ----
 lordsprayer:     {tier:'c', subj:'', kw:[]},
 friendmidnight:  {tier:'c', subj:'', kw:[]},
 beelzebub:       {tier:'a', subj:'The casting out of the dumb spirit', kw:[['takophon'],['dumb','demon'],['daimon','kophon']]},
 blessedwomb:     {tier:'c', subj:'', kw:[]},
 lightbody:       {tier:'c', subj:'', kw:[]},
 woepharisees:    {tier:'c', subj:'', kw:[]},
 woelawyers:      {tier:'c', subj:'', kw:[]},

 // ---- chapter 12 ----
 leaven:          {tier:'c', subj:'', kw:[]},
 richfool:        {tier:'a', subj:'The parable of the rich fool and his barns', kw:[['rich','fool'],['barns'],['aphron']]},
 takenothought:   {tier:'c', subj:'', kw:[]},
 loinsgirded:     {tier:'c', subj:'', kw:[]},
 steward:         {tier:'c', subj:'', kw:[]},
 discern:         {tier:'c', subj:'', kw:[]},

 // ---- chapter 13 ----
 repent:          {tier:'c', subj:'', kw:[]},
 figtree:         {tier:'a', subj:'The parable of the barren fig tree', kw:[['fig','tree'],['syke']]},
 bowedwoman:      {tier:'a', subj:'The healing of the woman bowed together', kw:[['bowed'],['infirmity','woman'],['synkyptousan']]},
 mustard:         {tier:'c', subj:'', kw:[]},
 straitgate:      {tier:'c', subj:'', kw:[]},
 jerusalem:       {tier:'c', subj:'', kw:[]},

 // ---- chapter 14 ----
 dropsy:          {tier:'a', subj:'The healing of the man with the dropsy', kw:[['dropsy'],['ydropikon']]},
 chiefrooms:      {tier:'c', subj:'', kw:[]},
 greatsupper:     {tier:'a', subj:'The parable of the great supper', kw:[['supper','parable'],['feast','bidden'],['deipnon']]},
 bearcross:       {tier:'c', subj:'', kw:[]},
 countcost:       {tier:'c', subj:'', kw:[]},
 salt:            {tier:'c', subj:'', kw:[]},

 // ---- chapter 15 ----
 lostsheep:       {tier:'b', subj:'The Good Shepherd', kw:[['shepherd','good'],['poimen','kalos']]},
 lostcoin:        {tier:'c', subj:'', kw:[]},
 prodigal:        {tier:'a', subj:'The parable of the Prodigal Son', kw:[['prodigal'],['asotos']]},

 // ---- chapter 16 ----
 unjuststeward:   {tier:'c', subj:'', kw:[]},
 mammon:          {tier:'c', subj:'', kw:[]},
 derided:         {tier:'c', subj:'', kw:[]},
 lazarus:         {tier:'a', subj:'The rich man and Lazarus in Abraham’s bosom', kw:[['lazarus','rich'],['abraham','bosom'],['ploysios']]},

 // ---- chapter 17 ----
 offences:        {tier:'c', subj:'', kw:[]},
 faithservants:   {tier:'c', subj:'', kw:[]},
 tenlepers:       {tier:'a', subj:'The cleansing of the ten lepers', kw:[['ten','leper'],['deka','lepr']]},
 kingdomwithin:   {tier:'c', subj:'', kw:[]},
 daysofson:       {tier:'c', subj:'', kw:[]},
 daysofnoe:       {tier:'c', subj:'', kw:[]},

 // ---- chapter 18 ----
 unjustjudge:     {tier:'c', subj:'', kw:[]},
 publican:        {tier:'a', subj:'The parable of the Publican and the Pharisee', kw:[['publican','pharisee'],['telones']]},
 children:        {tier:'a', subj:'Suffer the little children to come unto me', kw:[['children','suffer'],['paidia']]},
 richruler:       {tier:'a', subj:'The rich ruler who went away sorrowful', kw:[['rich','young'],['ruler','rich'],['plousios','archon']]},
 needleseye:      {tier:'c', subj:'', kw:[]},
 foretold:        {tier:'c', subj:'', kw:[]},
 blindjericho:    {tier:'a', subj:'The healing of the blind man at Jericho', kw:[['blind'],['typhlon'],['jericho']]},

 // ---- chapter 19 ----
 zacchaeus:       {tier:'a', subj:'Zacchaeus in the sycomore tree', kw:[['zacchaeus'],['zakchaios'],['sycomore']]},
 pounds:          {tier:'c', subj:'', kw:[]},
 entry:           {tier:'a', subj:'The Entry into Jerusalem', kw:[['entry','jerusalem'],['vaiophoros'],['palm']]},
 olivet:          {tier:'c', subj:'', kw:[]},
 wept:            {tier:'a', subj:'Christ weeping over Jerusalem', kw:[['wept','jerusalem'],['lament','city']]},
 temple:          {tier:'a', subj:'The cleansing of the Temple', kw:[['temple','cleans'],['money','changers'],['naou']]},

 // ---- chapter 20 ----
 bywhat:          {tier:'c', subj:'', kw:[]},
 husbandmen:      {tier:'a', subj:'The parable of the wicked husbandmen', kw:[['husbandmen'],['vineyard','wicked'],['ampelon']]},
 tribute:         {tier:'c', subj:'', kw:[]},
 risen:           {tier:'c', subj:'', kw:[]},
 davidson:        {tier:'c', subj:'', kw:[]},
 scribes:         {tier:'c', subj:'', kw:[]},

 // ---- chapter 21 ----
 mites:           {tier:'a', subj:'The widow’s two mites', kw:[['widow','mite'],['lepta'],['treasury']]},
 stones:          {tier:'c', subj:'', kw:[]},
 persecution:     {tier:'c', subj:'', kw:[]},
 armies:          {tier:'c', subj:'', kw:[]},
 coming:          {tier:'a', subj:'The Second Coming of Christ', kw:[['second','coming'],['last','judgment'],['deftera','parousia']]},
 watch:           {tier:'c', subj:'', kw:[]},

 // ---- chapter 22 ----
 plot:            {tier:'c', subj:'', kw:[]},
 upperroom:       {tier:'c', subj:'', kw:[]},
 supper:          {tier:'a', subj:'The Mystical Supper', kw:[['last','supper'],['mystical','supper'],['deipnos']]},
 betrayer:        {tier:'c', subj:'', kw:[]},
 whogreatest:     {tier:'c', subj:'', kw:[]},
 satandesired:    {tier:'c', subj:'', kw:[]},
 swords:          {tier:'c', subj:'', kw:[]},
 gethsemane:      {tier:'a', subj:'The Prayer in the Garden, and the angel strengthening him', kw:[['gethsemane'],['prayer','garden'],['proseuche']]},
 arrest:          {tier:'a', subj:'The betrayal with a kiss and the arrest', kw:[['betrayal'],['judas','kiss'],['prodosia']]},
 denial:          {tier:'a', subj:'The denial of Peter', kw:[['denial'],['peter','cock'],['arnisis']]},
 council:         {tier:'a', subj:'Christ mocked, and before the council', kw:[['caiaphas'],['mocking'],['council'],['empaigmos']]},

 // ---- chapter 23 ----
 pilate:          {tier:'a', subj:'Christ before Pilate', kw:[['pilate'],['pilatos']]},
 herodtrial:      {tier:'a', subj:'Christ before Herod in the gorgeous robe', kw:[['herod'],['irodi']]},
 barabbas:        {tier:'c', subj:'', kw:[]},
 simoncyrene:     {tier:'a', subj:'The way to Golgotha, and the daughters of Jerusalem', kw:[['cyrene'],['bearing','cross'],['golgotha','way']]},
 crucifixion:     {tier:'a', subj:'The Crucifixion, with the thief on the right hand', kw:[['crucifixion'],['stavrosis'],['thief']]},
 death:           {tier:'a', subj:'The darkness, the rent veil and the death of Christ', kw:[['crucifixion','darkness'],['veil','rent']]},
 burial:          {tier:'a', subj:'The Burial of Christ', kw:[['burial'],['entombment'],['epitaphios'],['joseph','arimathea']]},

 // ---- chapter 24 ----
 myrrhbearers:    {tier:'a', subj:'The Myrrhbearing Women at the empty tomb', kw:[['myrrh'],['myrophor'],['tomb','women']]},
 emmausroad:      {tier:'a', subj:'The road to Emmaus', kw:[['emmaus'],['emmaous']]},
 breaking:        {tier:'a', subj:'The supper at Emmaus — known in the breaking of bread', kw:[['emmaus','supper'],['breaking','bread']]},
 // Settled 2026-09-20d by looking at `Christos Apostolois Dionysiou`: a frontal Christ on a
 // footstool among ranked apostles holding books, no wounds and no detail of these verses.
 // Tier b, agreeing with overrides.js and with Matthew and Mark, which call it a type icon.
 peace:           {tier:'b', subj:'Christ manifest in the midst of the apostles', kw:[['apostles','appear'],['doors','shut'],['psilaphisis']]},
 understanding:   {tier:'c', subj:'', kw:[]},
 ascension:       {tier:'a', subj:'The Ascension of Christ', kw:[['ascension'],['analepsis']]},
};
