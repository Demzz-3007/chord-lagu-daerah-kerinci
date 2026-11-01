// DATABASE LAGU DAERAH
const judulLagu = [
    "Kenangan Maso Lamo",
    "Ayi Mato Darah"
    

];

const daftarLagu = judulLagu.map(function(judul) {

    if (judul === "Kenangan Maso Lamo") {
        return {
            judul: "Kenangan Maso Lamo",
            daerah: "Kerinci, Jambi",
            pencipta: "Surya",
            vokalis: "Surya / Arles",
            chord: "G - Bm - C - F",

            lirikChord:
`G                Bm      C         G
Rindu,,rindu nak busuo dikutubuh iko adik

G
Tibayang bayang maso

Bm                    C               G
Maso agi busamo kito buduo idak nak bupisah

G      F                       G
Elah butahun sudah adik tiado burito

G       F                           G
Adokah adik minin agi tinam kubadan uwo

G           F                      G
Jangan kan surat burito tiado aku tarimo

G          F                           G
Kenangan indah lah ku kubu dalam hati ku luko

G                 Bm          C      G
Rindu,,,rindu nak busuo dikutubuh iko adik

[ REFF ]

G                               C
Usah bujanji adik bilo raso idak pasti

F                            G
Lah butahun sudah pueh aku mununggu

G                                      C
Kutahu adik minin lah senang ditangan uhang

F                         G
Kirim ku jugo kabar ngan burito

G            F                      G
Jangan kan surat burito tiado aku tarimo

G        F                         G
Kanti sibayo minin abih Burumah tanggo galo

G         F                          G
Kenangan indah ngan dulu waktu kito buduo

G       F
Bialah hilang minin tinggan knangan maso

G
lamo

Kembali ke awal,,,`
        };
    }

    if (judul === "Ayi Mato Darah") {
        return {
            judul: "Ayi Mato Darah",
            daerah: "Kerinci, Jambi",
            pencipta: "Belum tersedia",
            vokalis: "Eka Diana",
            chord: "Em - D - Am - G - F - Dm - B",

            lirikChord:
`[ MUSIK / INTRO ]
Em     D     Am     G     F     Em     Dm     B

Em          D             Em
Bia turun ayi mato darah

D                                      Am
Kito dak mungkin hidup dibusamo

C                       G       F
Jangan disesan maso dibupisah sayang

Dm
ae

Em             F          Em
Nyawo ngan badan dibucerai jugo (2x)

[ MUSIK ]
Em     G     Dm     G     Em     B

Em             D                    Em
Sapo tahan dimunanggung siso

D                              Am
Kasih sayang lah tibagi duo

C                    G       F       Dm
Pado hidup sampai makan hati sayang

Em             F          Em
Duo jalan harus kito pilih (2x)

[ MUSIK ]
C     G     F     Em     C     G     F     Dm     Em

[ REFF ]

C
Bilo... beratnyo beban munimpo badan

Am          G     F     Dm     Em
Dapat kutahan

C
Jangan... kasih ngan sayang butambah kurang

Am
Sampai nyo hilang

G                  Dm
Sudah kutegah butambah parah

G       F       Dm       Em
Sifatnyo adik idak burubah

C       Em       D       Em
Apo dingan nak disesan agi

D                              Am
Samo mungharap bayang dalam mimpi

C                       G     F     Dm
Apo diharap lain ngan tijadi sayang

Em             F          Em
Nasib sudah dimunimpo diri (2x)`
    }
    }

    return {
        judul: judul,
        daerah: "Kerinci, Jambi",
        pencipta: "Belum tersedia",
        vokalis: "Belum tersedia",
        chord: "Belum tersedia",
        lirikChord: "Chord gitar untuk lagu ini belum tersedia."
    };
});

// MENAMPILKAN DAFTAR LAGU
function tampilkanLagu(data) {

    const container = document.getElementById("songContainer");

    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p>Lagu tidak ditemukan.</p>";
        return;
    }

    data.forEach(function(lagu, index) {

        container.innerHTML += `
            <div class="song-card">

                <h3>${lagu.judul}</h3>

                <p>Asal: ${lagu.daerah}</p>

                <p>Chord: ${lagu.chord}</p>

                <button onclick="lihatLagu(${index})">
                    Lihat Chord
                </button>

            </div>
        `;

    });
}


// FITUR PENCARIAN
function cariLagu() {

    const input = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const hasil = daftarLagu.filter(function(lagu) {

        return lagu.judul.toLowerCase().includes(input) ||
               lagu.daerah.toLowerCase().includes(input);

    });

    tampilkanLagu(hasil);
}


// MEMBUKA DETAIL LAGU
function lihatLagu(index) {
    laguAktif = daftarLagu[index];
    jumlahTranspose = 0;

    document.getElementById("detailLagu").style.display = "block";

    document.getElementById("judulDetail").innerText =
        laguAktif.judul;

    document.getElementById("asalDetail").innerText =
        "Asal daerah: " + laguAktif.daerah;

    document.getElementById("infoDetail").innerText =
    "Pencipta: " + (laguAktif.pencipta || "Belum tersedia") +
    "\nVokalis: " + (laguAktif.vokalis || "Belum tersedia") +
    (laguAktif.sumberChord ? "\nChord: " + laguAktif.sumberChord : "");
    
    perbaruiChord();

    document.getElementById("detailLagu").scrollIntoView({
        behavior: "smooth"
    });
}

// MENUTUP DETAIL LAGU
function tutupLagu() {

    document.getElementById("detailLagu").style.display = "none";

}
// MENYIMPAN LAGU YANG SEDANG DIBUKA
let laguAktif = null;
let jumlahTranspose = 0;

// DAFTAR NADA
const daftarNada = [
    "C", "C#", "D", "D#", "E", "F",
    "F#", "G", "G#", "A", "A#", "B"
];

// MENGUBAH SATU CHORD
function ubahNada(chord, langkah) {

    const bagian = chord.match(/^([A-G](?:#|b)?)(.*)$/);

    if (!bagian) return chord;

    let nada = bagian[1];
    let tambahan = bagian[2];

    // Mengubah nada dasar
    const nadaFlat = {
        "Db": "C#",
        "Eb": "D#",
        "Gb": "F#",
        "Ab": "G#",
        "Bb": "A#"
    };

    nada = nadaFlat[nada] || nada;

    let posisi = daftarNada.indexOf(nada);

    if (posisi === -1) return chord;

    posisi = (posisi + langkah + 12) % 12;

    return daftarNada[posisi] + tambahan;
}


// TRANSPOSE SELURUH LIRIK DAN CHORD
function prosesTranspose(teks, langkah) {

    return teks.replace(
        /(^|[^A-Za-z0-9])([A-G](?:#|b)?(?:maj7|maj|min|m7|m9|m|sus2|sus4|dim|aug|add9|7|9|11|13)?(?:\/[A-G](?:#|b)?)?)(?=$|[^A-Za-z0-9])/g,
        function(cocok, awalan, chord) {

            const bagian = chord.split("/");

            const hasil = ubahNada(bagian[0], langkah);

            if (bagian.length > 1) {
                return awalan + hasil + "/" +
                    ubahNada(bagian[1], langkah);
            }

            return awalan + hasil;
        }
    );
}


// MENAMPILKAN CHORD YANG SUDAH DIUBAH
function perbaruiChord() {
    if (!laguAktif) return;

    const hasil = prosesTranspose(
        laguAktif.lirikChord,
        jumlahTranspose
    );

    // Mengenali baris yang berisi chord saja
    const daftarBaris = hasil.split("\n");

    const tampilan = daftarBaris.map(function(baris) {
        const polaChord = /^(\s*[A-G](?:#|b)?(?:m|maj7|maj|min|sus2|sus4|dim|aug|add9|7|9|11|13)?(?:\/[A-G](?:#|b)?)?\.?\s*)+$/;

        const aman = baris
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        if (polaChord.test(baris) && baris.trim() !== "") {
            return '<span class="baris-chord">' + aman + '</span>';
        }

        return aman;
    });

    document.getElementById("isiChord").innerHTML =
        tampilan.join("\n");

    document.getElementById("transposeInfo").innerText =
        jumlahTranspose === 0
        ? "Nada: Original"
        : "Transpose: " +
          (jumlahTranspose > 0 ? "+" : "") +
          jumlahTranspose;
}


// TOMBOL TRANSPOSE
function transposeChord(arah) {

    jumlahTranspose += arah;
    perbaruiChord();

}


// RESET NADA
function resetTranspose() {

    jumlahTranspose = 0;
    perbaruiChord();

}

// MENJALANKAN WEBSITE
tampilkanLagu(daftarLagu);