// Pericope -> Orthodox iconographic subject.
// tier a = a genuine icon of THIS scene exists
// tier b = the passage is covered by a broader/festal icon (noted in the UI)
// tier c = no traditional icon; keep the plain verse row
// kw  = keywords matched against the harvested Byzantine/Orthodox pool
// q   = targeted Commons search queries used when the pool has nothing
module.exports = {
 genealogy:   {tier:'a', subj:'The Tree of Jesse / Genealogy of Christ', kw:[['genealogy'],['jesse']], q:['Tree of Jesse icon Byzantine','Genealogy of Jesus mosaic Chora']},
 annunciation:{tier:'a', subj:'The Nativity of Christ (Mt 1:18-25 is the Nativity Gospel)', kw:[['nativity'],['nativit']], q:['Nativity of Christ Byzantine icon','Nativity icon orthodox']},
 magi:        {tier:'a', subj:'The Adoration of the Magi', kw:[['magi'],['wise','men'],['three','kings']], q:['Adoration of the Magi Byzantine icon','Magi mosaic Sant Apollinare Nuovo']},
 flight2:     {tier:'a', subj:'The Flight into Egypt', kw:[['flight','egypt'],['fuga','egitto']], q:['Flight into Egypt icon orthodox','Flight into Egypt Byzantine']},
 innocents2:  {tier:'a', subj:'The Holy Innocents of Bethlehem', kw:[['innocent'],['massacre']], q:['Massacre of the Innocents Byzantine icon','Holy Innocents icon orthodox']},
 nativity:    {tier:'a', subj:'The Return from Egypt / Christ dwells in Nazareth', kw:[['return','egypt'],['nazareth']], q:['Return from Egypt icon','Holy Family returns Nazareth Byzantine']},

 forerunner:  {tier:'a', subj:'St John the Forerunner preaching in the wilderness', kw:[['forerunner'],['baptist','preach'],['prodromos']], q:['John the Forerunner icon preaching wilderness','Saint John the Baptist icon orthodox']},
 theophany:   {tier:'a', subj:'The Theophany / Baptism of Christ', kw:[['baptism'],['theophan'],['epiphan']], q:['Baptism of Jesus icon orthodox','Theophany icon Byzantine']},

 temptation:  {tier:'a', subj:'The Temptation of Christ in the wilderness', kw:[['temptation']], q:['Temptation of Christ Byzantine mosaic','Temptation of Christ icon orthodox']},
 galilee:     {tier:'b', subj:'Christ begins to preach (Christ the Teacher)', kw:[['christ','preach'],['teacher']], q:['Christ preaching icon Byzantine','Christ Pantocrator teaching icon']},
 calling:     {tier:'a', subj:'The Calling of Peter and Andrew, James and John', kw:[['calling','peter'],['vocation'],['fisher'],['call','apostle']], q:['Calling of Peter and Andrew mosaic Ravenna','Calling of the first apostles icon']},
 multitudes:  {tier:'b', subj:'Christ healing the multitudes', kw:[['healing','crippled'],['heals','multitude']], q:['Christ healing the sick Byzantine mosaic']},

 beatitudes:  {tier:'a', subj:'The Sermon on the Mount / The Beatitudes', kw:[['sermon','mount'],['beatitude']], q:['Sermon on the Mount icon orthodox','Beatitudes icon Byzantine']},
 saltlight5:  {tier:'b', subj:'Sermon on the Mount (discourse)', kw:[['sermon','mount']], q:[]},
 law5a:       {tier:'b', subj:'Christ and the Law (Sermon on the Mount)', kw:[['sermon','mount']], q:[]},
 murder5:     {tier:'b', subj:'Sermon on the Mount (discourse)', kw:[['sermon','mount']], q:[]},
 adultery5:   {tier:'b', subj:'Sermon on the Mount (discourse)', kw:[['sermon','mount']], q:[]},
 oaths5:      {tier:'b', subj:'Sermon on the Mount (discourse)', kw:[['sermon','mount']], q:[]},
 resist5:     {tier:'b', subj:'Sermon on the Mount (discourse)', kw:[['sermon','mount']], q:[]},
 enemies5:    {tier:'b', subj:'Sermon on the Mount (discourse)', kw:[['sermon','mount']], q:[]},

 alms6:       {tier:'b', subj:'Almsgiving / works of mercy', kw:[['alms'],['mercy','work']], q:['Works of mercy icon orthodox','almsgiving icon Byzantine']},
 lordsprayer: {tier:'a', subj:'The Lord’s Prayer / Christ teaching to pray', kw:[['pater','noster'],['lord','prayer'],['our','father']], q:['Lord’s Prayer icon orthodox','Pater Noster icon Byzantine']},
 treasure6:   {tier:'b', subj:'Sermon on the Mount (discourse)', kw:[['sermon','mount']], q:[]},
 anxiety6:    {tier:'b', subj:'Sermon on the Mount (discourse)', kw:[['sermon','mount']], q:[]},

 judge7:      {tier:'b', subj:'Sermon on the Mount (discourse)', kw:[['sermon','mount']], q:[]},
 askseek7:    {tier:'b', subj:'Sermon on the Mount (discourse)', kw:[['sermon','mount']], q:[]},
 wisebuilder: {tier:'a', subj:'The Wise and Foolish Builders', kw:[['wise','foolish','builder'],['house','rock']], q:['Parable wise and foolish builders icon','house built on rock parable art']},

 leper8:      {tier:'a', subj:'Christ cleansing the leper', kw:[['leper'],['leprosy']], q:['Christ healing the leper Byzantine mosaic','healing of the leper icon']},
 centurion8:  {tier:'a', subj:'The Faith of the Centurion', kw:[['centurion']], q:['Christ and the centurion Byzantine mosaic','centurion servant healing icon']},
 petermen8:   {tier:'a', subj:'Healing of St Peter’s mother-in-law', kw:[['mother','law'],['simon','mother']], q:['Christ heals Peter mother in law mosaic Monreale']},
 cost8:       {tier:'c', subj:'', kw:[], q:[]},
 storm:       {tier:'a', subj:'Christ stilling the storm', kw:[['storm'],['tempest'],['calming']], q:['Christ calming the storm icon orthodox','stilling the tempest Byzantine']},
 demoniacs8:  {tier:'a', subj:'The Gadarene demoniacs', kw:[['gadar'],['demon','possess'],['swine']], q:['Healing of the Gadarene demoniac mosaic Ravenna','exorcism of the Gerasene icon']},

 paralytic:   {tier:'a', subj:'The Healing of the Paralytic', kw:[['paralytic'],['paralys']], q:['Healing of the paralytic icon orthodox','Healing the paralytic mosaic Byzantine']},
 matthew:     {tier:'a', subj:'The Calling of St Matthew', kw:[['calling','matthew'],['matthew','tax'],['saint','matthew']], q:['Calling of Saint Matthew icon orthodox','Apostle Matthew icon Byzantine']},
 fasting9:    {tier:'b', subj:'Christ questioned about fasting', kw:[['pharisee','house']], q:[]},
 jairus:      {tier:'a', subj:'The raising of the daughter of Jairus', kw:[['jairus'],['daughter','synagogue'],['synagogue','resurrect']], q:['Raising of Jairus daughter icon','daughter of Jairus Byzantine mosaic']},
 blind9:      {tier:'a', subj:'The healing of the two blind men', kw:[['blind']], q:['Christ healing the blind icon orthodox','healing of the blind Byzantine mosaic']},
 mute9:       {tier:'a', subj:'Healing of the mute demoniac', kw:[['dumb'],['mute'],['demon']], q:['Christ healing the mute man icon','healing dumb demoniac Byzantine']},
 harvest9:    {tier:'b', subj:'The harvest is plentiful / Christ sends labourers', kw:[['harvest']], q:[]},

 twelve:      {tier:'a', subj:'The Synaxis of the Twelve Apostles / the sending out', kw:[['twelve','apostle'],['synaxis'],['sending','apostle'],['mission','apostle']], q:['Synaxis of the Twelve Apostles icon','Christ sending out the apostles icon Byzantine']},
 persecute10: {tier:'b', subj:'The Twelve Apostles', kw:[['twelve','apostle'],['synaxis']], q:[]},
 fear10:      {tier:'b', subj:'The Twelve Apostles', kw:[['twelve','apostle'],['synaxis']], q:[]},
 confess10:   {tier:'b', subj:'The Twelve Apostles', kw:[['twelve','apostle'],['synaxis']], q:[]},
 rewards10:   {tier:'b', subj:'The Twelve Apostles', kw:[['twelve','apostle'],['synaxis']], q:[]},

 johnq:       {tier:'a', subj:'John the Forerunner sends his disciples to Christ', kw:[['baptist','disciple'],['john','prison']], q:['John the Baptist sends disciples to Jesus icon','John the Baptist in prison Byzantine']},
 thisgen11:   {tier:'b', subj:'St John the Forerunner', kw:[['forerunner'],['prodromos']], q:[]},
 woecities11: {tier:'b', subj:'Christ rebuking the cities', kw:[['christ','preach']], q:[]},
 hidden11:    {tier:'b', subj:'Christ the Wisdom of God', kw:[['pantocrator'],['sophia']], q:['Christ Pantocrator icon Byzantine','Holy Wisdom Christ icon']},
 yoke:        {tier:'a', subj:'Come unto Me — Christ Pantocrator / the Merciful', kw:[['pantocrator'],['eleemon'],['merciful']], q:['Christ Pantocrator Sinai icon','Christ the Merciful icon Byzantine']},

 sabbath:     {tier:'a', subj:'Christ and the disciples plucking corn / healing the withered hand', kw:[['withered'],['paralysed','hand'],['corn'],['sabbath']], q:['Christ heals the man with the withered hand mosaic','plucking corn on the sabbath icon']},
 beelzebub12: {tier:'b', subj:'Christ casting out a demon', kw:[['demon','possess'],['exorcis']], q:[]},
 signjonah12: {tier:'a', subj:'The Prophet Jonah — sign of the Resurrection', kw:[['jonah'],['jonas']], q:['Prophet Jonah icon orthodox','Jonah and the whale Byzantine']},
 kindred12:   {tier:'b', subj:'The Theotokos', kw:[['theotokos'],['hodegetria'],['virgin','child']], q:['Theotokos Hodegetria icon Byzantine']},

 sower:       {tier:'a', subj:'The Parable of the Sower', kw:[['sower'],['sowing']], q:['Parable of the Sower icon orthodox','Sower parable Byzantine miniature']},
 weeds13:     {tier:'a', subj:'The Parable of the Wheat and the Tares', kw:[['tares'],['weeds'],['wheat']], q:['Parable of the tares icon','wheat and tares parable art']},
 mustard13:   {tier:'a', subj:'The Mustard Seed and the Leaven', kw:[['mustard'],['leaven']], q:['Parable of the mustard seed art','Parable of the leaven art']},
 weedsexp13:  {tier:'b', subj:'The Parable of the Wheat and the Tares', kw:[['tares'],['weeds']], q:[]},
 kingdom:     {tier:'a', subj:'The Hidden Treasure and the Pearl of Great Price', kw:[['pearl'],['treasure','field'],['hidden','treasure']], q:['Parable of the pearl of great price art','Parable hidden treasure art']},
 prophet13:   {tier:'a', subj:'Christ rejected at Nazareth', kw:[['nazareth','synagogue'],['rejected'],['synagogue']], q:['Christ in the synagogue at Nazareth icon','Jesus rejected at Nazareth Byzantine']},

 beheading:   {tier:'a', subj:'The Beheading of St John the Forerunner', kw:[['beheading'],['decollation'],['salome']], q:['Beheading of John the Baptist icon orthodox','Decollation of the Forerunner Byzantine']},
 feeding5:    {tier:'a', subj:'The Multiplication of the Loaves and Fishes', kw:[['multiplication'],['loaves'],['five','thousand']], q:['Multiplication of the loaves icon orthodox','feeding of the five thousand Byzantine mosaic']},
 walking:     {tier:'a', subj:'Christ walking on the water / saving Peter', kw:[['walking','water'],['peter','wave'],['drowning','peter'],['saves','peter']], q:['Christ walking on the water icon orthodox','Christ saves Peter from the waves mosaic']},

 tradition15: {tier:'b', subj:'Christ disputing with the Pharisees', kw:[['pharisee']], q:['Christ disputing with the Pharisees Byzantine mosaic']},
 canaanite:   {tier:'a', subj:'The Canaanite Woman', kw:[['canaanite'],['syrophoenician']], q:['Canaanite woman icon orthodox','Christ and the Canaanite woman Byzantine']},
 feeding4:    {tier:'a', subj:'The Feeding of the Four Thousand', kw:[['multiplication'],['loaves'],['four','thousand']], q:['Multiplication of the loaves and fishes mosaic Monreale']},

 signdem16:   {tier:'b', subj:'Christ disputing with the Pharisees', kw:[['pharisee']], q:[]},
 leaven:      {tier:'b', subj:'Christ and the disciples', kw:[['christ','apostle']], q:[]},
 confession:  {tier:'a', subj:'The Confession of St Peter / Christ gives the keys', kw:[['keys'],['confession','peter'],['traditio','clavium']], q:['Christ giving the keys to Peter Byzantine mosaic','Confession of Peter icon orthodox']},
 passion16:   {tier:'b', subj:'Christ foretells his Passion', kw:[['christ','apostle']], q:[]},

 transfiguration:{tier:'a', subj:'The Transfiguration', kw:[['transfigur'],['metamorphosis']], q:['Transfiguration icon orthodox','Transfiguration Byzantine mosaic']},
 boy17:       {tier:'a', subj:'The healing of the lunatic boy', kw:[['lunatic'],['epileptic'],['demon','boy'],['possessed','boy']], q:['Christ healing the epileptic boy icon','healing of the lunatic boy Byzantine']},
 passion17:   {tier:'b', subj:'Christ foretells his Passion', kw:[['christ','apostle']], q:[]},
 tax17:       {tier:'a', subj:'The stater in the fish’s mouth (the temple tax)', kw:[['tribute','money'],['stater'],['coin','fish'],['temple','tax']], q:['Christ and the tribute money coin in fish icon','Saint Peter coin in fish mouth Byzantine']},

 greatest18:  {tier:'b', subj:'Christ setting a child in their midst', kw:[['child']], q:['Christ blessing the children icon orthodox']},
 lostsheep:   {tier:'a', subj:'The Good Shepherd and the Lost Sheep', kw:[['good','shepherd'],['lost','sheep'],['shepherd']], q:['Good Shepherd Byzantine mosaic','Parable of the lost sheep icon']},
 reconcile18: {tier:'c', subj:'', kw:[], q:[]},
 servant:     {tier:'a', subj:'The Unforgiving Servant', kw:[['unforgiving'],['unmerciful','servant'],['wicked','servant']], q:['Parable of the unforgiving servant art','unmerciful servant parable icon']},

 divorce19:   {tier:'b', subj:'Christ teaching / the marriage at Cana', kw:[['cana']], q:[]},
 children:    {tier:'a', subj:'Christ blessing the children', kw:[['bless','children'],['little','children'],['suffer','children']], q:['Christ blessing the children icon orthodox','Let the little children come to me Byzantine']},
 richman:     {tier:'a', subj:'The Rich Young Ruler', kw:[['rich','young'],['rich','man'],['rich','ruler']], q:['Rich young ruler icon orthodox','Christ and the rich young man Byzantine']},

 vineyard:    {tier:'a', subj:'The Labourers in the Vineyard', kw:[['labourers','vineyard'],['workers','vineyard'],['vineyard']], q:['Parable of the labourers in the vineyard icon','workers in the vineyard Byzantine']},
 passion20a:  {tier:'b', subj:'Christ foretells his Passion', kw:[['christ','apostle']], q:[]},
 james20:     {tier:'b', subj:'The sons of Zebedee', kw:[['zebedee'],['james','john']], q:['Apostles James and John icon orthodox']},
 blind20:     {tier:'a', subj:'The two blind men of Jericho', kw:[['jericho','blind'],['blind']], q:['Christ heals two blind men of Jericho mosaic']},

 entry:       {tier:'a', subj:'The Entry into Jerusalem (Palm Sunday)', kw:[['entry','jerusalem'],['triumphal','entry'],['palm','sunday']], q:['Entry into Jerusalem icon orthodox','Entry into Jerusalem Byzantine mosaic']},
 temple:      {tier:'a', subj:'The Cleansing of the Temple', kw:[['cleansing','temple'],['tradesmen'],['money','changer'],['expulsion','temple']], q:['Cleansing of the Temple icon orthodox','Christ driving out the money changers Byzantine']},
 figtree21:   {tier:'a', subj:'The Cursing of the Fig Tree', kw:[['fig','tree'],['fig']], q:['Cursing of the fig tree icon orthodox','Christ and the fig tree Byzantine']},
 authority21: {tier:'b', subj:'Christ disputing in the Temple', kw:[['pharisee'],['temple','dispute']], q:[]},
 twosons21:   {tier:'b', subj:'The Parable of the Two Sons', kw:[['two','sons']], q:['Parable of the two sons art']},
 tenants21:   {tier:'a', subj:'The Wicked Husbandmen', kw:[['husbandmen'],['wicked','tenant'],['vinedresser']], q:['Parable of the wicked husbandmen icon','wicked tenants parable Byzantine']},

 wedding:     {tier:'a', subj:'The Marriage Feast of the King’s Son', kw:[['marriage','feast'],['wedding','feast'],['wedding','garment']], q:['Parable of the wedding feast icon orthodox','marriage feast of the king son parable']},
 caesar22:    {tier:'a', subj:'The Tribute Money — render unto Caesar', kw:[['tribute'],['caesar'],['census','coin']], q:['Render unto Caesar tribute money icon','tribute money Byzantine mosaic']},
 resurrect22: {tier:'b', subj:'Christ disputing with the Sadducees', kw:[['sadducee'],['pharisee']], q:[]},
 commandment: {tier:'a', subj:'The Greatest Commandment / Christ the Teacher', kw:[['lawyer'],['great','commandment'],['pantocrator']], q:['Christ Pantocrator teaching icon','Christ and the lawyer great commandment']},

 hypocrisy23: {tier:'b', subj:'Christ rebuking the scribes and Pharisees', kw:[['pharisee'],['scribe']], q:['Christ rebuking the Pharisees Byzantine mosaic']},
 woes:        {tier:'b', subj:'Christ rebuking the scribes and Pharisees', kw:[['pharisee'],['scribe']], q:[]},
 lament23:    {tier:'a', subj:'Christ weeping over Jerusalem', kw:[['weep','jerusalem'],['lament','jerusalem'],['jerusalem']], q:['Christ weeping over Jerusalem icon','lament over Jerusalem Byzantine']},

 olivet:      {tier:'a', subj:'The Second Coming of Christ', kw:[['second','coming'],['parousia'],['christ','glory']], q:['Second Coming of Christ icon orthodox','Christ in Glory Byzantine mosaic']},

 virgins:     {tier:'a', subj:'The Ten Virgins (wise and foolish)', kw:[['ten','virgin'],['wise','virgin'],['foolish','virgin']], q:['Parable of the ten virgins icon orthodox','wise and foolish virgins Rossano Gospels']},
 talents:     {tier:'a', subj:'The Parable of the Talents', kw:[['talent']], q:['Parable of the talents icon orthodox','parable of the talents Byzantine']},
 judgment:    {tier:'a', subj:'The Last Judgment / the sheep and the goats', kw:[['last','judgment'],['sheep','goat'],['judgment']], q:['Last Judgment icon orthodox','separation of sheep and goats Ravenna mosaic']},

 plot26:      {tier:'b', subj:'The Sanhedrin plots against Christ', kw:[['sanhedrin'],['caiaphas'],['conspir']], q:['Sanhedrin plot against Christ Byzantine']},
 anointing26: {tier:'a', subj:'The Anointing at Bethany (the sinful woman)', kw:[['anointing'],['bethany'],['sinful','woman'],['myrrh','woman']], q:['Anointing at Bethany icon orthodox','sinful woman anoints Christ Byzantine']},
 judas26:     {tier:'a', subj:'Judas receives the thirty pieces of silver', kw:[['judas','silver'],['thirty','piece'],['judas','betray'],['judas']], q:['Judas thirty pieces of silver icon','Judas bargains with the priests Byzantine']},
 supper:      {tier:'a', subj:'The Mystical Supper', kw:[['last','supper'],['mystical','supper'],['abendmahl'],['communion','apostle']], q:['Mystical Supper icon orthodox','Last Supper Byzantine mosaic']},
 denial26:    {tier:'a', subj:'Christ foretells Peter’s denial', kw:[['peter','denial'],['denial']], q:['Peter denial icon orthodox']},
 gethsemane:  {tier:'a', subj:'The Prayer in Gethsemane', kw:[['gethsem'],['agony','garden'],['mount','olives','pray']], q:['Christ praying in Gethsemane icon orthodox','Agony in the garden Byzantine']},
 arrest26:    {tier:'a', subj:'The Betrayal — the Kiss of Judas', kw:[['kiss','judas'],['judas','kiss'],['betrayal'],['arrest']], q:['Kiss of Judas icon orthodox','Betrayal of Christ Byzantine mosaic']},
 trial:       {tier:'a', subj:'Christ before Caiaphas and the denial of Peter', kw:[['caiaphas'],['peter','denial'],['denial'],['sanhedrin']], q:['Christ before Caiaphas icon','Denial of Peter Byzantine mosaic']},

 judas27:     {tier:'a', subj:'The remorse and death of Judas', kw:[['judas','remorse'],['judas','hang'],['judas']], q:['Judas remorse icon Byzantine','Judas returns the silver mosaic']},
 pilate:      {tier:'a', subj:'Christ before Pilate', kw:[['pilate']], q:['Christ before Pilate icon orthodox','Christ before Pilate Byzantine mosaic']},
 crucifixion: {tier:'a', subj:'The Crucifixion', kw:[['crucifix'],['golgotha'],['calvary']], q:['Crucifixion icon orthodox','Crucifixion Byzantine mosaic']},
 burial:      {tier:'a', subj:'The Burial / Entombment of Christ (Epitaphios)', kw:[['entombment'],['burial'],['deposition'],['lamentation'],['epitaph']], q:['Entombment of Christ icon orthodox','Epitaphios Threnos icon']},
 guard27:     {tier:'b', subj:'The sealing of the tomb', kw:[['tomb','guard'],['sepulchre','seal'],['tomb']], q:['Guards at the tomb of Christ icon']},

 resurrection:{tier:'a', subj:'The Resurrection — the Harrowing of Hell (Anastasis)', kw:[['anastasis'],['harrowing'],['resurrection'],['women','grave'],['myrrh']], q:['Anastasis Harrowing of Hell icon orthodox','Resurrection icon Byzantine']},
 guardrep28:  {tier:'b', subj:'The report of the guard', kw:[['tomb','guard'],['tomb']], q:[]},
 commission:  {tier:'a', subj:'The Great Commission / Christ sending the apostles', kw:[['commission'],['mission','apostle'],['ascension']], q:['Great Commission icon orthodox','Christ sends the apostles icon Byzantine']},
};
