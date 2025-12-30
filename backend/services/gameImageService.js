const https = require('https');

class GameImageService {
  constructor() {
    // Giant Bomb API konfigūracija
    this.apiKey = '4d3c22f77ed638c276aab3ea6cd6d3af3a344179';
    this.baseUrl = 'https://www.giantbomb.com/api';
  }

  // Paieška žaidimo per Giant Bomb API
  async searchGame(gameName) {
    try {
      // Išvalome žaidimo pavadinimą paieškos optimizavimui
      const cleanName = this.cleanGameName(gameName);
      
      // Tiesiogiai naudojame fallback visiems žaidimams kol API neveikia
      console.log(`🎯 Naudojame fallback cover'į žaidimui: ${gameName}`);
      return this.getFallbackImage(gameName);
      
      /* Temporarily disabled Giant Bomb API due to JSON parse errors
      const searchUrl = `${this.baseUrl}/search/?api_key=${this.apiKey}&format=json&query=${encodeURIComponent(cleanName)}&resources=game&limit=5`;
      
      console.log(`🔍 Ieškome žaidimo: "${cleanName}"`);
      
      const searchResults = await this.makeApiRequest(searchUrl);
      
      if (searchResults && searchResults.results && searchResults.results.length > 0) {
        // Ieškome geriausio atitikimo
        const bestMatch = this.findBestMatch(searchResults.results, cleanName);
        
        if (bestMatch) {
          // Pabandome gauti geresnį cover'į
          const coverUrl = await this.getBestCoverImage(bestMatch);
          if (coverUrl) {
            console.log(`✅ Rastas cover: ${bestMatch.name} -> ${coverUrl}`);
            return coverUrl;
          }
        }
      }
      
      console.log(`❌ Nerastas cover žaidimui: ${gameName}, naudojame fallback`);
      return this.getFallbackImage(gameName);
      */
      
    } catch (error) {
      console.error('Giant Bomb API klaida:', error.message);
      return this.getFallbackImage(gameName);
    }
  }

  // Gauna geriausią cover'į iš žaidimo duomenų
  async getBestCoverImage(game) {
    try {
      // Pirmiausia pabandome gauti detalius žaidimo duomenis
      const gameDetailsUrl = `${this.baseUrl}/game/${game.guid}/?api_key=${this.apiKey}&format=json&field_list=image,images`;
      const gameDetails = await this.makeApiRequest(gameDetailsUrl);
      
      if (gameDetails && gameDetails.results) {
        const gameData = gameDetails.results;
        
        // Ieškome tinkamo dydžio cover'io
        if (gameData.image) {
          // Pirmenybė: original_url > super_url > medium_url > small_url
          if (gameData.image.original_url) return gameData.image.original_url;
          if (gameData.image.super_url) return gameData.image.super_url;
          if (gameData.image.medium_url) return gameData.image.medium_url;
          if (gameData.image.small_url) return gameData.image.small_url;
        }
        
        // Jei turime papildomų nuotraukų, ieškome cover'io
        if (gameData.images && gameData.images.length > 0) {
          // Ieškome "Box Art" arba panašaus tipo nuotraukos
          const boxArt = gameData.images.find(img => 
            img.tags && img.tags.toLowerCase().includes('box')
          );
          
          if (boxArt && boxArt.original_url) {
            return boxArt.original_url;
          }
          
          // Grąžiname pirmą nuotrauką jei nerasta box art
          if (gameData.images[0] && gameData.images[0].original_url) {
            return gameData.images[0].original_url;
          }
        }
      }
      
      // Fallback į pagrindinį image
      if (game.image && game.image.medium_url) {
        return game.image.medium_url;
      }
      
      return null;
      
    } catch (error) {
      console.error('Klaida gaunant žaidimo cover:', error.message);
      // Fallback į pagrindinį image
      if (game.image && game.image.medium_url) {
        return game.image.medium_url;
      }
      return null;
    }
  }

  // Išvalo žaidimo pavadinimą geresnei paieškai
  cleanGameName(gameName) {
    return gameName
      .replace(/\(.*?\)/g, '') // Pašalina skliaustelius (PC), (PlayStation 5)
      .replace(/Key|GLOBAL|EUROPE|Steam|Origin|PSN|XBOX/gi, '') // Pašalina platformų žodžius
      .replace(/Standard Edition|Ultimate Edition|Deluxe Edition/gi, '') // Pašalina edition tipus
      .replace(/EA App/gi, '') // Pašalina EA App
      .trim()
      .replace(/\s+/g, ' '); // Pašalina papildomus tarpus
  }

  // Randa geriausią atitikimą paieškos rezultatuose
  findBestMatch(results, searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    
    // Specialūs atvejai problematiniams žaidimams
    if (searchLower.includes('split fiction')) {
      // Split Fiction yra naujas žaidimas, todėl naudojame fallback
      return null; // Grąžins null ir naudos fallback
    }
    
    // Ieškome tikslaus atitikimo
    let exactMatch = results.find(game => 
      game.name && game.name.toLowerCase() === searchLower
    );
    
    if (exactMatch) return exactMatch;
    
    // Ieškome dalinio atitikimo
    let partialMatch = results.find(game => 
      game.name && game.name.toLowerCase().includes(searchLower)
    );
    
    if (partialMatch) return partialMatch;
    
    // Ieškome atvirkštinio atitikimo
    let reverseMatch = results.find(game => 
      game.name && searchLower.includes(game.name.toLowerCase())
    );
    
    if (reverseMatch) return reverseMatch;
    
    // Grąžiname pirmą rezultatą
    return results[0];
  }

  // HTTP užklausa į Giant Bomb API
  makeApiRequest(url) {
    return new Promise((resolve, reject) => {
      const options = {
        headers: {
          'User-Agent': 'GameSearchApp/1.0'
        }
      };

      https.get(url, options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            
            if (jsonData.status_code === 1) {
              resolve(jsonData);
            } else {
              reject(new Error(`API klaida: ${jsonData.error}`));
            }
          } catch (error) {
            reject(new Error(`JSON parse klaida: ${error.message}`));
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  }

  // Fallback cover'iai jei API nepavyks
  getFallbackImage(gameName) {
    const fallbacks = {
      'FIFA 23': 'https://upload.wikimedia.org/wikipedia/en/a/a6/FIFA_23_Cover.jpg',
      'Red Dead Redemption 2': 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
      'Split Fiction': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2001120/library_600x900.jpg' // CORRECT Steam App ID: 2001120
    };

    // Ieškome fallback pagal žaidimo pavadinimą
    for (const [key, url] of Object.entries(fallbacks)) {
      if (gameName.includes(key)) {
        console.log(`📸 Naudojame fallback cover: ${key} -> ${url}`);
        return url;
      }
    }

    return 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Game+Cover';
  }
}

module.exports = new GameImageService();