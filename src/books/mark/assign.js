// Pericope -> the Orthodox iconographic subject a passage of Mark would carry.
// tier a = an icon of THIS scene exists in Orthodox iconography
// tier b = the Church attaches a type icon to the passage without depicting its verses
// tier c = no traditional icon; keep the plain verse row
// kw = keywords matched against the harvested Byzantine/Orthodox pool by src/tools/.
//
// Mark tells almost nothing that Matthew does not, so most of these subjects are already in
// the shared pool under a Matthew passage. The owner's decision of 2026-09-20 is that a
// Commons file may serve Mark as well: it is the same icon of the same event. What Mark does
// not inherit is the words — every icon it shows gets its own label, its own prose reading
// and its own markers, written against Mark's text.
module.exports = {
 // ---- chapter 1 ----
 beginning:    {tier:'c', subj:'', kw:[]},
 forerunner:   {tier:'a', subj:'St John the Forerunner preaching in the wilderness', kw:[['forerunner','preach'],['prodromos'],['baptist','wilderness']]},
 baptism:      {tier:'a', subj:'The Theophany — the Baptism of Christ in Jordan', kw:[['baptism'],['theophan'],['jordan'],['baptisis']]},
 temptation:   {tier:'a', subj:'Christ tempted in the wilderness', kw:[['temptation'],['tempted'],['peirasmos']]},
 kingdom:      {tier:'b', subj:'The Forerunner cast into prison, which Mark reports at 1:14', kw:[['prison'],['phylaken'],['elkomenos']]},
 fishers:      {tier:'a', subj:'The calling of Peter, Andrew, James and John from their nets', kw:[['calling','fisher'],['klesis'],['nets'],['peter','andrew']]},
 authority:    {tier:'c', subj:'', kw:[]},
 capernaum:    {tier:'a', subj:'The unclean spirit cast out in the synagogue at Capernaum', kw:[['daimon'],['demoniac'],['unclean','spirit'],['exorcis']]},
 petersmother: {tier:'a', subj:'The healing of Peter’s mother-in-law', kw:[['mother','law'],['peter','fever'],['penthera']]},
 evening:      {tier:'c', subj:'', kw:[]},
 preaching:    {tier:'c', subj:'', kw:[]},
 leper:        {tier:'a', subj:'The cleansing of the leper', kw:[['leper'],['lepros'],['leprosy']]},

 // ---- chapter 2 ----
 paralytic:    {tier:'a', subj:'The paralytic let down through the roof at Capernaum', kw:[['paralyt'],['paralyton']]},
 levi:         {tier:'a', subj:'The calling of Levi the son of Alphaeus at the receipt of custom', kw:[['matthew','call'],['levi'],['publican']]},
 fasting:      {tier:'c', subj:'', kw:[]},
 sabbath:      {tier:'c', subj:'', kw:[]},

 // ---- chapter 3 ----
 witheredhand: {tier:'a', subj:'The healing of the withered hand on the sabbath', kw:[['withered'],['xeran'],['hand','sabbath']]},
 multitudes:   {tier:'c', subj:'', kw:[]},
 twelve:       {tier:'b', subj:'The Synaxis of the Holy Apostles', kw:[['synaxis'],['twelve','apostle'],['apostolon']]},
 beside:       {tier:'c', subj:'', kw:[]},
 blasphemy:    {tier:'c', subj:'', kw:[]},
 brethren:     {tier:'c', subj:'', kw:[]},

 // ---- chapter 4 ----
 sower:        {tier:'a', subj:'The Parable of the Sower', kw:[['sower'],['seed','sow'],['speiron']]},
 candle:       {tier:'c', subj:'', kw:[]},
 seedgrowing:  {tier:'c', subj:'', kw:[]},
 mustard:      {tier:'c', subj:'', kw:[]},
 storm:        {tier:'a', subj:'The stilling of the storm on the sea', kw:[['storm'],['tempest'],['thalassan'],['sea','calm']]},

 // ---- chapter 5 ----
 gerasene:     {tier:'a', subj:'The Gerasene demoniac and the swine', kw:[['gadaren'],['gerasen'],['daimonizomen'],['swine']]},
 issueofblood: {tier:'a', subj:'The woman with the issue of blood touching the hem', kw:[['haemorrh'],['issue','blood'],['bleeding'],['hem']]},
 jairus:       {tier:'a', subj:'The raising of the daughter of Jairus', kw:[['jairus'],['iairos'],['daughter','rais']]},

 // ---- chapter 6 ----
 nazareth:     {tier:'c', subj:'', kw:[]},
 sending:      {tier:'b', subj:'The sending out of the Twelve', kw:[['sending'],['mission'],['apostol','sent']]},
 herod:        {tier:'c', subj:'', kw:[]},
 beheading:    {tier:'a', subj:'The Beheading of St John the Forerunner', kw:[['beheading'],['decollation'],['apotomi'],['herodias'],['salome']]},
 return:       {tier:'c', subj:'', kw:[]},
 fivethousand: {tier:'a', subj:'The Multiplication of the Loaves — the five thousand fed', kw:[['multiplication'],['loaves'],['five','thousand'],['arton']]},
 water:        {tier:'a', subj:'Christ walking on the sea', kw:[['walking','water'],['walking','sea'],['peripaton']]},
 gennesaret:   {tier:'c', subj:'', kw:[]},

 // ---- chapter 7 ----
 tradition:    {tier:'c', subj:'', kw:[]},
 defile:       {tier:'c', subj:'', kw:[]},
 syrophoenician:{tier:'a', subj:'The Syrophoenician (Canaanite) woman’s daughter healed', kw:[['canaanit'],['chananai'],['syrophoenic']]},
 deafmute:     {tier:'a', subj:'The healing of the deaf and dumb man — Ephphatha', kw:[['deaf'],['dumb'],['kophon'],['mogilal']]},

 // ---- chapter 8 ----
 fourthousand: {tier:'a', subj:'The seven loaves — the four thousand fed', kw:[['seven','loaves'],['four','thousand'],['multiplication']]},
 leaven:       {tier:'c', subj:'', kw:[]},
 bethsaida:    {tier:'a', subj:'The blind man of Bethsaida healed by degrees', kw:[['blind'],['typhlon'],['bethsaida']]},
 confession:   {tier:'c', subj:'', kw:[]},
 takecross:    {tier:'c', subj:'', kw:[]},

 // ---- chapter 9 ----
 transfiguration:{tier:'a', subj:'The Transfiguration on the mountain', kw:[['transfig'],['metamorph'],['tabor']]},
 elias:        {tier:'c', subj:'', kw:[]},
 dumbspirit:   {tier:'a', subj:'The boy with a dumb spirit healed at the foot of the mountain', kw:[['lunatic'],['daimon','child'],['boy','spirit']]},
 greatest:     {tier:'c', subj:'', kw:[]},
 notagainst:   {tier:'c', subj:'', kw:[]},
 offend:       {tier:'c', subj:'', kw:[]},

 // ---- chapter 10 ----
 divorce:      {tier:'c', subj:'', kw:[]},
 children:     {tier:'c', subj:'', kw:[]},
 richman:      {tier:'c', subj:'', kw:[]},
 leftall:      {tier:'c', subj:'', kw:[]},
 foretold:     {tier:'c', subj:'', kw:[]},
 zebedee:      {tier:'c', subj:'', kw:[]},
 minister:     {tier:'c', subj:'', kw:[]},
 bartimaeus:   {tier:'a', subj:'Blind Bartimaeus healed on the way out of Jericho', kw:[['blind'],['typhlon'],['bartimae'],['jericho']]},

 // ---- chapter 11 ----
 entry:        {tier:'a', subj:'The Entry into Jerusalem', kw:[['entry','jerusalem'],['vaiophoros'],['palm'],['baion']]},
 figtree:      {tier:'a', subj:'The fig tree cursed', kw:[['fig','tree'],['fig','curse'],['syke']]},
 temple:       {tier:'a', subj:'The Cleansing of the Temple', kw:[['cleansing','temple'],['money','changer'],['tradesmen'],['merchants']]},
 faith:        {tier:'c', subj:'', kw:[]},
 bywhat:       {tier:'c', subj:'', kw:[]},

 // ---- chapter 12 ----
 vineyard:     {tier:'a', subj:'The Parable of the Wicked Husbandmen', kw:[['husbandmen'],['vineyard'],['tenants']]},
 tribute:      {tier:'c', subj:'', kw:[]},
 risen:        {tier:'c', subj:'', kw:[]},
 commandment:  {tier:'c', subj:'', kw:[]},
 davidson:     {tier:'c', subj:'', kw:[]},
 scribes:      {tier:'c', subj:'', kw:[]},
 widowmite:    {tier:'a', subj:'The widow casting in her two mites', kw:[['widow','mite'],['widow','offering'],['chera']]},

 // ---- chapter 13 ----
 stones:       {tier:'c', subj:'', kw:[]},
 sorrows:      {tier:'c', subj:'', kw:[]},
 persecution:  {tier:'c', subj:'', kw:[]},
 desolation:   {tier:'c', subj:'', kw:[]},
 coming:       {tier:'a', subj:'The Second Coming of Christ', kw:[['second','coming'],['last','judgment'],['deutera','parousia']]},
 figparable:   {tier:'c', subj:'', kw:[]},
 watch:        {tier:'c', subj:'', kw:[]},

 // ---- chapter 14 ----
 plot:         {tier:'c', subj:'', kw:[]},
 anointing:    {tier:'a', subj:'The woman with the alabaster box anointing Christ at Bethany', kw:[['anoint'],['alabaster'],['myron'],['bethany']]},
 judas:        {tier:'a', subj:'Judas taking the money from the chief priests', kw:[['judas'],['thirty','silver'],['ioudas']]},
 upperroom:    {tier:'c', subj:'', kw:[]},
 betrayer:     {tier:'a', subj:'The Last Supper — one of you shall betray me', kw:[['last','supper'],['mystical','supper'],['deipnos']]},
 supper:       {tier:'a', subj:'The Mystical Supper — the giving of the Body and Blood', kw:[['communion','apostles'],['mystical','supper'],['eucharist'],['metalepsis']]},
 denialforetold:{tier:'c', subj:'', kw:[]},
 gethsemane:   {tier:'a', subj:'The Prayer in the Garden of Gethsemane', kw:[['gethsemane'],['agony'],['proseuche','kepo']]},
 arrest:       {tier:'a', subj:'The Betrayal — the kiss of Judas and the arrest', kw:[['betrayal'],['kiss'],['arrest'],['prodosia']]},
 council:      {tier:'a', subj:'Christ before the high priest and the council', kw:[['caiaphas'],['krinomenos'],['sanhedrin'],['council']]},
 highpriest:   {tier:'a', subj:'Art thou the Christ? — the high priest rending his clothes', kw:[['caiaphas'],['krinomenos'],['high','priest']]},
 denial:       {tier:'a', subj:'The denial of Peter and the cock crowing', kw:[['denial'],['peter','cock'],['arnesis']]},

 // ---- chapter 15 ----
 pilate:       {tier:'a', subj:'Christ before Pilate', kw:[['pilate'],['pilato'],['praetorium']]},
 barabbas:     {tier:'a', subj:'Pilate washing his hands and Barabbas released', kw:[['pilate','wash'],['barabbas'],['hands']]},
 mocking:      {tier:'a', subj:'The crowning with thorns and the mocking', kw:[['thorns'],['mocking'],['akanth'],['purple']]},
 crucifixion:  {tier:'a', subj:'The Crucifixion', kw:[['crucifix'],['stavrosis'],['golgotha'],['cross']]},
 reviled:      {tier:'c', subj:'', kw:[]},
 death:        {tier:'a', subj:'The death of Christ on the Cross', kw:[['crucifix'],['stavrosis'],['death','cross']]},
 veil:         {tier:'a', subj:'The centurion confessing the Son of God', kw:[['centurion'],['longinus'],['ekatontarch']]},
 burial:       {tier:'a', subj:'The Burial — the taking down and laying in the tomb', kw:[['entombment'],['burial'],['epitaphios'],['deposition'],['lamentation']]},

 // ---- chapter 16 ----
 myrrhbearers: {tier:'a', subj:'The Myrrhbearing Women at the empty tomb', kw:[['myrrh'],['myrophor'],['women','tomb'],['sepulchre','angel']]},
 magdalene:    {tier:'a', subj:'Christ appearing first to Mary Magdalene', kw:[['magdalene'],['noli','tangere'],['touch','me','not']]},
 commission:   {tier:'b', subj:'Christ manifest among the apostles at the sending', kw:[['commission'],['apostles','sent'],['christ','apostles']]},
 ascension:    {tier:'a', subj:'The Ascension — He sat on the right hand of God', kw:[['ascension'],['analepsis']]},
};
