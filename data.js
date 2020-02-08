"strict"

const SOUTH_COURT = [
	[-1,   -1,    -1,    -1,    1501,  1502,  1503,  1504,  1505,  1506,  1507,  1508,  1509,  1510],
	[-1,   -1,    -1,    1401,  1402,  1403,  1404,  1405,  1406,  1407,  1408,  1409,  1410,  1411],
	[-1,   -1,    -1,    1301,  1302,  1303,  1304,  1305,  1306,  1307,  1308,  1309,  1310,  1311],
	[-1,   -1,    1201,  1202,  1203,  1204,  1205,  1206,  1207,  1208,  1209,  1210,  1211,  1212],
	[-1,   1101,  1102,  1103,  1104,  1105,  1106,  1107,  1108,  1109,  1110,  1111,  1112,  1113],
	[-1,   1001,  1002,  1003,  1004,  1005,  1006,  1007,  1008,  1009,  1010,  1011,  1012,  1013],
	[901,  902,   903,   904,   905,   906,   907,   908,   909,   910,   911,   912,   913,   914],
	[801,  802,   803,   804,   805,   806,   807,   808,   809,   810,   811,   812,   813,   814],
	[701,  702,   703,   704,   705,   706,   707,   708,   709,   710,   711,   712,   713,   714],
	[601,  602,   603,   604,   605,   606,   607,   608,   609,   610,   611,   612,   613,   614],
	[501,  502,   503,   504,   505,   506,   507,   508,   509,   510,   511,   512,   513,   514],
	[401,  402,   403,   404,   405,   406,   407,   408,   409,   410,   411,   412,   413,   414],
	[301,  302,   303,   304,   305,   306,   307,   308,   309,   310,   311,   312,   313,   314],
	[201,  202,   203,   204,   205,   206,   207,   208,   209,   210,   211,   212,   213,   214],
	[-1,   101,   102,   103,   104,   105,   106,   107,   108,   109,   110,   111,   112,   113],
]

const BRIGHT_COURT = [
	[1511,  1512,  1513,  1514,  -1,    -1,    -1,    -1,    -1,   -1,   -1,   -1],
	[1412,  1413,  1414,  1415,  1416,  -1,    -1,    -1,    -1,   -1,   -1,   -1],
	[1312,  1313,  1314,  1315,  1316,  1317,  -1,    -1,    -1,   -1,   -1,   -1],
	[1213,  1214,  1215,  1216,  1217,  1218,  1219,  -1,    -1,   -1,   -1,   -1],
	[1114,  1115,  1116,  1117,  1118,  1119,  1120,  -1,    -1,   -1,   -1,   -1],
	[1014,  1015,  1016,  1017,  1018,  1019,  1020,  1021,  -1,   -1,   -1,   -1],
	[915,   916,   917,   918,   919,   920,   921,   922,   923,  -1,   -1,   -1],
	[815,   816,   817,   818,   819,   820,   821,   822,   823,  824,  -1,   -1],
	[715,   716,   717,   718,   719,   720,   721,   722,   723,  724,  725,  -1],
	[615,   616,   617,   618,   619,   620,   621,   622,   623,  624,  625,  626],
	[515,   516,   517,   518,   519,   520,   521,   522,   523,  524,  525,  526],
	[415,   416,   417,   418,   419,   420,   421,   422,   423,  424,  425,  426],
	[315,   316,   317,   318,   319,   320,   321,   322,   323,  324,  325,  326],
	[215,   216,   217,   218,   219,   220,   221,   222,   223,  224,  225,  226],
	[114,   115,   116,   117,   118,   119,   120,   121,   122,  123,  124,  -1],
]

const SOUTH_COURT = [
	[730, 729, 728, 727, 726],
	[631, 630, 629, 628, 627],
	[531, 530, 529, 528, 527],
	[431, 430, 429, 428, 427],
	[331, 330, 329, 328, 327],
	[231, 230, 229, 228, 227],
	[-1, -1, -1, -1, -1],
]

const BUILDINGS = [
	{name: "サウスコート", layout: SOUTH_COURT},
	{name: "フライトどーと", layout: BRIGHT_COURT},
	{name: "センターコート", layout: SOUTH_COURT},
]

