const rooms = [
  {
    title: "Double Room",
    price: "199$",
    image: "/img/room/room-b1.jpg",
  },
  {
    title: "Premium King Room",
    price: "159$",
    image: "/img/room/room-b2.jpg",
  },
  {
    title: "Deluxe Room",
    price: "198$",
    image: "/img/room/room-b3.jpg",
  },
  {
    title: "Family Room",
    price: "299$",
    image: "/img/room/room-b4.jpg",
  },
];

export default function RoomSection() {
  return (
    <section className="py-5">
      {" "}
      {/* spad = pt-100px pb-100px ≈ py-24 */}
      <div className="container-fluid max-w-[1320px] mx-auto px-4">
        {" "}
        {/* mimic container-fluid */}
        <div className="hp-room-items overflow-hidden -mx-4">
          <div className="row flex flex-wrap">
            {rooms.map((room) => (
              <div
                key={room.title}
                className="col-lg-3 col-md-6 w-full md:w-1/2 lg:w-1/4 px-4 mb-8 group"
              >
                <div
                  className="
                    hp-room-item
                    relative
                    h-[500px]
                    bg-center bg-cover bg-no-repeat
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                  style={{ backgroundImage: `url(${room.image})` }}
                >
                  <div
                    className="
                      hr-text
                      absolute inset-0
                      bg-opacity-60
                      flex flex-col justify-end
                      p-6
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                    "
                  >
                    <h3 className="text-white text-2xl font-semibold mb-1">
                      {room.title}
                    </h3>
                    <h2 className="text-[#dfa974] font-playfair text-3xl mb-4">
                      {room.price}
                      <span className="text-white text-lg font-normal">
                        /Pernight
                      </span>
                    </h2>
                    <table className="text-white text-sm mb-4">
                      <tbody>
                        <tr>
                          <td className="r-o pr-2 font-medium">Size:</td>
                          <td>30 ft</td>
                        </tr>
                        <tr>
                          <td className="r-o pr-2 font-medium">Capacity:</td>
                          <td>Max person 5</td>
                        </tr>
                        <tr>
                          <td className="r-o pr-2 font-medium">Bed:</td>
                          <td>King Beds</td>
                        </tr>
                        <tr>
                          <td className="r-o pr-2 font-medium">Services:</td>
                          <td>Wifi, Television, Bathroom,…</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex mt-6">
                <a
                  href="#"
                  className="text-sm text-white uppercase font-semibold tracking-wider border-b-2 border-[#dfa974] pb-[2px]"
                >
                  More Details
                </a>
              </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
