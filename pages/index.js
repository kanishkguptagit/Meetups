import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>NextJS Meetups</title>
        <meta
          name="description"
          content="Browse a highly active Nextjs meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps() {
//     //fetch data here from an api
//     return {
//         props:{
//             meetups:DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
  //fetch data here from an api

  const client = await MongoClient.connect(
    "mongodb+srv://user1:1234@cluster0.ldwnj.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
}

export default HomePage;
