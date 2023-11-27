const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jsonwebtoken = require('jsonwebtoken');

module.exports = async function checkPostOwnership(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Token mancante. Accesso negato.' });
        }
    
        // Verifica e decodifica il token
        jsonwebtoken.verify(token.replace('Bearer ', ''), 'il mio token', (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token non valido. Accesso negato.' });
            }
    
            // I dati utente decodificati sono disponibili in decoded
            return decodedData = decoded;
            
        });
       

        const post = await prisma.post.findUnique({
            where: {
                slug: req.params.slug
            },
            select: {
                userId: true,
            },
        });

        if (!post || post.userId !== decodedData.id) {
            return res.status(403).json({ error: "Accesso negato. Non hai i permessi necessari." });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Si è verificato un errore interno del server." });
    }
}

