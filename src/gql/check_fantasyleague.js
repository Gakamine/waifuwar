import gql from 'graphql-tag'
export const CHECK_FANTASYLEAGUE = gql`
query checkVoteFantasyleague($token: String!) {
    checkVoteFantasyleague(token: $token) {
        waifu1Id
        waifu2Id
        waifu3Id
        waifu4Id
        waifu5Id
        waifu6Id
        waifu7Id
        waifu8Id
        waifu9Id
        bestWaifuId
        meme1Id
        meme2Id
        meme3Id
        meme4Id
        meme5Id
        meme6Id
        meme7Id
        meme8Id
        meme9Id
        bestMemeId
        husbando1Id
        husbando2Id
        husbando3Id
        husbando4Id
        husbando5Id
        husbando6Id
        husbando7Id
        husbando8Id
        husbando9Id
        bestHusbandoId
    }
}
`
