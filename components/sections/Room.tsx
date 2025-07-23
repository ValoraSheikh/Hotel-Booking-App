import { DirectionAwareHover } from "../ui/direction-aware-hover";

const rooms = [
  {
    id: 1,
    title: "Double Room",
    price: "₹5000",
    image:
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Premium King Room",
    price: "₹7000",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Deluxe Room",
    price: "₹10000",
    image:
      "https://images.unsplash.com/photo-1601479207163-3c4dd6b0bb91?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          <div className=" flex-col flex flex-wrap justify-around md:flex-row items-center gap-5">
            {rooms.map((room) => (
              <DirectionAwareHover key={room.id} imageUrl={room.image}>
                <p className="font-bold text-xl">{room.title}</p>
                <p className="font-normal text-sm">{room.price} / night</p>
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
              </DirectionAwareHover>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
