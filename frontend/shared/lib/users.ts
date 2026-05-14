/**
 * Р»РѕРєР°Р»СЊРЅР° Р±Р°Р·Р° РґР°РЅРёС… РєРѕСЂРёСЃС‚СѓРІР°С‡С–РІ РґР»СЏ СЂРѕР·СЂРѕР±РєРё.
 * Р·Р±РµСЂС–РіР°С” РїРѕС‡Р°С‚РєРѕРІС– С‚РµСЃС‚РѕРІС– Р°РєР°СѓРЅС‚Рё С‚Р° РЅРѕРІРёС… РєРѕСЂРёСЃС‚СѓРІР°С‡С–РІ Сѓ localStorage.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  birthDate?: string;
  goal?: string;
  bio?: string;
  subscription: string;
  memberSince: string;
  avatar: string;
  progress: number;
  streak: number;
  skills: number;
  pearls: number;
  radarScores: Record<string, number>;
}

const STORAGE_KEY = "yatra_users";

interface StoredUser extends User {
  passwordHash: string;
  password?: string;
}

function sha256(input: string): string {
  const bytes = new TextEncoder().encode(input);
  const hash = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ]);
  const primes = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ]);
  const bitLength = bytes.length * 8;
  const paddedLength = (((bytes.length + 9 + 63) >> 6) << 6);
  const padded = new Uint8Array(paddedLength);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  new DataView(padded.buffer).setUint32(paddedLength - 4, bitLength);
  const w = new Uint32Array(64);

  for (let offset = 0; offset < padded.length; offset += 64) {
    const view = new DataView(padded.buffer, offset, 64);
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(i * 4);
    for (let i = 16; i < 64; i++) {
      const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = hash;
    for (let i = 0; i < 64; i++) {
      const s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + s1 + ch + primes[i] + w[i]) >>> 0;
      const s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (s0 + maj) >>> 0;
      h = g; g = f; f = e; e = (d + temp1) >>> 0;
      d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    hash[0] = (hash[0] + a) >>> 0; hash[1] = (hash[1] + b) >>> 0;
    hash[2] = (hash[2] + c) >>> 0; hash[3] = (hash[3] + d) >>> 0;
    hash[4] = (hash[4] + e) >>> 0; hash[5] = (hash[5] + f) >>> 0;
    hash[6] = (hash[6] + g) >>> 0; hash[7] = (hash[7] + h) >>> 0;
  }
  return Array.from(hash, (n) => n.toString(16).padStart(8, "0")).join("");
}

function rightRotate(value: number, amount: number) {
  return (value >>> amount) | (value << (32 - amount));
}

const DEFAULT_USERS = [
  {
    id: "usr_001",
    name: "Arjun Sharma",
    email: "arjun.sharma@gmail.com",
    passwordHash: "cc067328e7828d30f097e922dd18bda5b88942c130f335209577340bf944e8b2",
    birthDate: "March 12, 2003",
    goal: "Land a Frontend Engineer role at a product company",
    bio: "Full-Stack Explorer В· CS Junior",
    subscription: "Explorer",
    memberSince: "January 2025",
    avatar: "/assets/3d_prof_anf.png",
    progress: 45,
    streak: 12,
    skills: 5,
    pearls: 8,
    radarScores: { Frontend: 0.72, Backend: 0.38, Logic: 0.55, Design: 0.60, SoftSkills: 0.70 },
  },
  {
    id: "usr_002",
    name: "Priya Nair",
    email: "priya.nair@gmail.com",
    passwordHash: "c1cd36721f00820029d17878c910109b70aa5f9aab7b9ef71eda0a28586f67f2",
    birthDate: "July 4, 2002",
    goal: "Become a UX/Product Designer at a SaaS startup",
    bio: "Design Voyager В· HCI Graduate",
    subscription: "Navigator",
    memberSince: "March 2025",
    avatar: "/assets/3d_prof_anf_binocular.png",
    progress: 68,
    streak: 21,
    skills: 8,
    pearls: 14,
    radarScores: { Frontend: 0.55, Backend: 0.20, Logic: 0.45, Design: 0.88, SoftSkills: 0.82 },
  },
  {
    id: "usr_003",
    name: "Rohan Mehta",
    email: "rohan.mehta@gmail.com",
    passwordHash: "b95e6d03ce8b3bd2c4c6efd0bfecfc94cdc569bd8c2dd844590203c570dc427a",
    birthDate: "November 28, 2001",
    goal: "Get into a top ML research lab or FAANG as a Data Scientist",
    bio: "Data Captain В· ML Enthusiast",
    subscription: "Captain",
    memberSince: "October 2024",
    avatar: "/assets/ai_bot_octo.png",
    progress: 82,
    streak: 34,
    skills: 11,
    pearls: 23,
    radarScores: { Frontend: 0.30, Backend: 0.65, Logic: 0.90, Design: 0.25, SoftSkills: 0.60 },
  },
];

let users: StoredUser[] = DEFAULT_USERS.slice();

function loadUsers() {
  if (typeof window === "undefined") return users;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length > 0) {
      users = parsed.map((user: StoredUser) => {
        if (user.password && !user.passwordHash) {
          user.passwordHash = sha256(user.password);
          delete user.password;
        }
        return user;
      });
      saveUsers();
    }
  } catch {
    users = DEFAULT_USERS.slice();
  }
  return users;
}

function saveUsers() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch {}
}

/**
 * С‚РµСЃС‚РѕРІС– Р°РєР°СѓРЅС‚Рё РґР»СЏ РґРµРјРѕ
 */
export const TEST_USERS = DEFAULT_USERS.map(({ passwordHash: _passwordHash, ...user }) => user);

/**
 * Р°РІС‚РµРЅС‚РёС„С–РєР°С†С–СЏ РєРѕСЂРёСЃС‚СѓРІР°С‡Р° Р·Р° email С‚Р° РїР°СЂРѕР»РµРј
 */
export function authenticate(email: string, password: string): User | null {
  loadUsers();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase().trim() &&
      u.passwordHash === sha256(password)
  );
  if (!user) return null;
  const { passwordHash: _passwordHash, password: _password, ...safe } = user;
  return safe as User;
}

/**
 * РїРѕС€СѓРє РєРѕСЂРёСЃС‚СѓРІР°С‡Р° Р·Р° email
 */
export function getUserByEmail(email: string): User | null {
  loadUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user) return null;
  const { passwordHash: _passwordHash, password: _password, ...safe } = user;
  return safe as User;
}

/**
 * СЂРµС”СЃС‚СЂР°С†С–СЏ РЅРѕРІРѕРіРѕ РєРѕСЂРёСЃС‚СѓРІР°С‡Р°
 */
export function registerUser({ name, email, password }: Record<string, string>): User | null {
  loadUsers();
  if (getUserByEmail(email)) return null;
  const newUser = {
    id: `usr_${Date.now()}`,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash: sha256(password),
    birthDate: "",
    goal: "Start my Yatra journey",
    bio: "New member of Yatra",
    subscription: "Explorer",
    memberSince: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    avatar: "/assets/3d_prof_anf.png",
    progress: 0,
    streak: 0,
    skills: 0,
    pearls: 0,
    radarScores: { Frontend: 0.12, Backend: 0.08, Logic: 0.14, Design: 0.10, SoftSkills: 0.10 },
  };
  users.push(newUser);
  saveUsers();
  const { passwordHash: _passwordHash, ...safe } = newUser;
  return safe as User;
}

/**
 * РїРѕС€СѓРє РєРѕСЂРёСЃС‚СѓРІР°С‡Р° Р·Р° id (РґР»СЏ РІС–РґРЅРѕРІР»РµРЅРЅСЏ СЃРµСЃС–С—)
 */
export function getUserById(id: string): User | null {
  loadUsers();
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  const { passwordHash: _passwordHash, password: _password, ...safe } = user;
  return safe as User;
}

