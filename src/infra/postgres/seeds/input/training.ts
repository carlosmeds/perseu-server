export const trainingsToSeed = [
  {
    name: "Levantamento de peso",
    sessions: [
      {
        name: "Alongamento",
        description: "Alongar o corpo para evitar lesões",
        exercises: [
          {
            name: "Alongar membros inferiores",
            description: "Focar no alongamento das coxas e panturrilhas",
          },
          {
            name: "Alongar membros superiores",
            description: "Focar no alongamento dos braços e ombros",
          },
        ],
      },
      {
        name: "Aquecimento",
        description: "Realizar movimentos com a bola",
        exercises: [
          {
            name: "Dois toques",
            description:
              "Com um colega, realizar dois toques na bola. O jogador que errar deve correr até a linha de fundo e voltar",
          },
          {
            name: "Bobinho",
            description:
              "Durante 5 minutos, realizar passes curtos e rápidos com cinco jogadores, em um círculo, sendo que um deve ser o bobinho",
          },
          {
            name: "Inversões",
            description:
              "Realizar inversões com um colega no lado inverso do campo, durante 5 minutos",
          },
        ],
      },
      {
        name: "Exercícios aeróbicos",
        description: "Preparar corpo para o jogo",
        exercises: [
          {
            name: "Corrida",
            description: "Trotar por 5 minutos ao redor do campo",
          },
          {
            name: "Bicicleta",
            description:
              "Durante 20 minutos, pedalar na bicicleta. Alterar velocidade",
          },
        ],
      },
    ],
    teamId: 1,
  },
  {
    name: "Treino de posse de bola",
    sessions: [
      {
        name: "Toques rápidos",
        description: "Toques rápidos em campo reduzido",
        exercises: [
          {
            name: "Toques rápidos com dois times de 6 jogadores",
            description:
              "Enquadramento de 4x4. 2x2 no meio. Um time deve manter a posse de bola",
          },
        ],
      },
      {
        name: "Transição",
        description:
          "Esse treino é para treinar a transição de ataque para defesa",
        exercises: [
          {
            name: "Transição de ataque para defesa",
            description:
              "No início do campo, um time deve atacar e o outro defender. Quando o time atacante perder a bola, o time defensor deve chegar ao fim do campo",
          },
        ],
      },
    ],
    teamId: 1,
  },
  {
    name: "Finalização e defesa",
    sessions: [
      {
        name: "Finalização de longe",
        description: "Buscar melhorar a finalização de longe",
        exercises: [
          {
            name: "Finalização de fora da área",
            description: "Alternar chutes do meio e do lado do campo",
          },
          {
            name: "Finalização de fora da área em movimento",
            description:
              "Alternar chutes do meio e do lado do campo. Um jogador deve correr em direção ao gol e receber o passe",
          },
        ],
      },
      {
        name: "Bolas paradas",
        description: "Melhora a finalização de bolas paradas",
        exercises: [
          {
            name: "Pênaltis",
            description: "Dividir em dois times. Alternar pênaltis",
          },
          {
            name: "Falta",
            description: "Focar na finalização no canto do goleiro",
          },
          {
            name: "Escanteio",
            description:
              "Alternar escanteios de cada lado do campo e utilizar formação combinada",
          },
        ],
      },
      {
        name: "Finalização de curta distância",
        description: "Melhorar tomada de decisão na hora de finalizar",
        exercises: [
          {
            name: "Chutes 3x3",
            description:
              "Em gol pequeno, buscar gol no 3x3. Todos devem tocar na bola",
          },
        ],
      },
    ],
    teamId: 1,
  },
  {
    name: "Pós-jogo",
    sessions: [
      {
        name: "Corrida",
        description: "Corrida leve",
        exercises: [
          {
            name: "Trote leve",
            description: "Trote leve por 10 minutos",
          },
          {
            name: "Trote alternado",
            description:
              "Trote em fila. Quem estiver no final da fila deve correr para o início",
          },
        ],
      },
      {
        name: "Hidro",
        description: "Realizar hidroginástica para regenerar o corpo",
        exercises: [
          {
            name: "Membros inferiores",
            description: "Realizar exercícios com membros inferiores",
          },
          {
            name: "Costas",
            description:
              "Realizar exercícios com membros superiores e costas. Utilizar boia",
          },
        ],
      },
    ],
    teamId: 1,
  },
  {
    name: "Treino tático",
    sessions: [
      {
        name: "Defesa x ataque",
        description: "",
        exercises: [
          {
            name: "Defesa com 3 zagueiros",
            description:
              "Defesa deve utilizar esquema com 3 zagueiros e 2 laterais",
          },
          {
            name: "Defesa com 1 volante",
            description:
              "Defesa deve utilizar esquema com  2 zagueiros, 1 volante e 2 laterais",
          },
        ],
      },
    ],
    teamId: 2,
  },
  {
    name: "Treino de pressão",
    sessions: [
      {
        name: "Treinar pressão no ataque",
        description: "Coordenar pressão no ataque",
        exercises: [
          {
            name: "Pressão na zaga",
            description:
              "Durante 10 minutos, zaga deve manter posse de bola. Evitar chutões",
          },
          {
            name: "Pressão pós-perda",
            description:
              "Meio-campo deve manter bola, enquanto zagueiros e atacantes pressionam",
          },
        ],
      },
      {
        name: "Pressão com ligações rápidas",
        description: "Evitar contra-ataques",
        exercises: [
          {
            name: "Pressão contra ligações rápidas",
            description: "Defesa deve lançar para atacantes. Pressionar para lançamento falhar",
          },
        ],
      },
    ],
    teamId: 3,
  },
];
