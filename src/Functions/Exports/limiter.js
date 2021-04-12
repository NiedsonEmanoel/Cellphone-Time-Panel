const RateLimit = require('express-rate-limit');

/**
 * Proteção de DDOS
 * O usuário pode fazer 30 requisições a cada 8 segundos
 * após isso as requisições são negadas por 8 segundos no primeiro bloqueio
 * 16 no segundo, 32 na terceira e assim sucessivamente.
 */

let limiter = new RateLimit({
    windowMs: 8 * 1000, // 8 seconds
    max: 30
});

module.exports = limiter;