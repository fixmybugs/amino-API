
let testData = [
    {
      userAddedTopicList: null,
      agent: {
        status: null,
        isNicknameVerified: false,
        uid: '98c92fb8-a08e-4ad4-bd54-1ab2c7b026a1',
        level: 0,
        followingStatus: 0,
        accountMembershipStatus: 0,
        isGlobal: false,
        membershipStatus: 0,
        reputation: 0,
        role: null,
        ndcId: null,
        membersCount: 0,
        nickname: null,
        icon: null
      },
      listedStatus: 1,
      probationStatus: 0,
      themePack: {
        themeColor: '#9c6917',
        themePackHash: '53bb46dcab0bbe1471a78ea24d49105a',
        themePackRevision: 1,
        themePackUrl: 'http://theme.narvii.com/x168015608-rev1.ndthemepack'
      },
      membersCount: 10,
      primaryLanguage: 'es',
      communityHeat: 0,
      strategyInfo: '{"objectType": "community", "scenarioType": "my-joined-community-list", "objectId": "168015608", "ndcId": 168015608, "primaryLanguage": "es", "reqId": "d0eb8928-4a3d-4d6a-b3b8-b1d92247e219", "uiPos": 0}',
      tagline: 'Está comunidad es solo para testear los end points :)',
      joinType: 0,
      status: 0,
      launchPage: { mediaList: [], title: '' },
      modifiedTime: '2019-12-27T01:57:35Z',
      ndcId: 168015608,
      activeInfo: {},
      link: 'http://aminoapps.com/c/GamersTest',
      icon: 'http://cm1.narvii.com/7420/a66da0ba7b390199a5d8b95e9b29b10db05a0649_00.jpg',
      updatedTime: '2022-06-06T09:39:19Z',
      endpoint: 'GamersTest',
      name: 'GamersTest',
      templateId: 4,
      createdTime: '2019-12-27T01:57:35Z',
      promotionalMediaList: [ [Array] ]
    },
    {
      userAddedTopicList: null,
      agent: {
        status: null,
        isNicknameVerified: false,
        uid: 'b4e5d22b-9499-4caf-a726-c7cb943d5cef',
        level: 0,
        followingStatus: 0,
        accountMembershipStatus: 0,
        isGlobal: false,
        membershipStatus: 0,
        reputation: 0,
        role: null,
        ndcId: null,
        membersCount: 0,
        nickname: null,
        icon: null
      },
      listedStatus: 2,
      probationStatus: 0,
      themePack: {
        themeColor: '#e38b85',
        themePackHash: '2316041dcc4024c06c19e4e362be680b',
        themePackRevision: 246,
        themePackUrl: 'http://theme.narvii.com/x244304829-rev246.ndthemepack'
      },
      membersCount: 1898289,
      primaryLanguage: 'es',
      communityHeat: 1,
      strategyInfo: '{"objectType": "community", "scenarioType": "my-joined-community-list", "objectId": "244304829", "ndcId": 244304829, "primaryLanguage": "es", "reqId": "d0eb8928-4a3d-4d6a-b3b8-b1d92247e219", "uiPos": 1}',
      tagline: '¡Comparte tu amor hacia BTS!',
      joinType: 0,
      status: 0,
      launchPage: { mediaList: [Array], title: 'Monster | Serial Killers.' },
      modifiedTime: '2016-07-09T15:40:46Z',
      ndcId: 244304829,
      activeInfo: {},
      link: 'http://aminoapps.com/c/a-r-m-ys-forever',
      icon: 'http://cm1.narvii.com/7878/24a16cc916eae6e561a3665453ff21ef961debcf_00.jpg',
      updatedTime: '2023-01-31T00:42:08Z',
      endpoint: 'a-r-m-ys-forever',
      name: "ARMY's Amino",
      templateId: 3,
      createdTime: '2016-07-09T15:40:46Z',
      promotionalMediaList: [ [Array] ]
    },
    {
      userAddedTopicList: null,
      agent: {
        status: null,
        isNicknameVerified: false,
        uid: '0721f538-185f-4e9e-8f54-fe5a80ec61e2',
        level: 0,
        followingStatus: 0,
        accountMembershipStatus: 0,
        isGlobal: false,
        membershipStatus: 0,
        reputation: 0,
        role: null,
        ndcId: null,
        membersCount: 0,
        nickname: null,
        icon: null
      },
      listedStatus: 2,
      probationStatus: 0,
      themePack: {
        themeColor: '#5cc20c',
        themePackHash: 'be40b2bcea68156482cdcdb3e870356b',
        themePackRevision: 130,
        themePackUrl: 'http://theme.narvii.com/x67-rev130.ndthemepack'
      },
      membersCount: 3141384,
      primaryLanguage: 'es',
      communityHeat: 1,
      strategyInfo: '{"objectType": "community", "scenarioType": "my-joined-community-list", "objectId": "67", "ndcId": 67, "primaryLanguage": "es", "reqId": "d0eb8928-4a3d-4d6a-b3b8-b1d92247e219", "uiPos": 2}',
      tagline: 'TE DAMOS LA BIENVENIDA A ANIME AMINO, TU MUNDO, TU ESPACIO',
      joinType: 0,
      status: 0,
      launchPage: {
        mediaList: [Array],
        title: '¡Navidad con Totoro y una plantita! | Manualidad con Porcelana fría'
      },
      modifiedTime: '2016-07-09T11:00:49Z',
      ndcId: 67,
      activeInfo: {},
      link: 'http://aminoapps.com/c/anime-es',
      icon: 'http://static.narvii.com/default-assets/x67_icon_00.png',
      updatedTime: '2023-01-31T00:45:41Z',
      endpoint: 'anime-es',
      name: '•Anime•',
      templateId: 3,
      createdTime: '2016-07-09T11:00:49Z',
      promotionalMediaList: [ [Array] ]
    }
  ]
  



export default function joinedCommunitiesResume({data}){

    if(typeof data !== 'object'){
        throw new Error('data must be an array of objects with amino communities response');
    }

    let resume = data.map((element)=> {
        return {
            name: element.name,
            link: element.link,
            icon: element.icon,
            communityId: element.ndcId,

        }
    })

    return resume;
}