import { Button, Input } from "@/components/demo";
import { getEvent, getMenyEvents } from "@/lib/utils/events";
import { patchPostEvent } from "@/lib/utils/events/post";
import { EventPostSchema, EventPostType, EventType } from "@/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

export const DemoEvent = () => {
	const handleClickGetEvents = async () => {
		console.log(await getMenyEvents());
	};

	const [eventId, setEventId] = useState("");

	const handleClickGetEvent = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(await getEvent(eventId));
	};
	return (
		<>
			<Button onClick={handleClickGetEvents} type="button">
				Get Events
			</Button>
			<form onSubmit={handleClickGetEvent}>
				<Input onChange={(e) => setEventId(e.target.value)} />
				<Button type="submit">Get Event</Button>
			</form>
			<RegsiterPostEvent />
		</>
	);
};

const RegsiterPostEvent = () => {
	const [events, setEvents] = useState<EventType[]>();

	const { handleSubmit, control } = useForm<
		Omit<EventPostType, "createdAt" | "updatedAt" | "id" | "authorId">
	>({
		defaultValues: {
			title: "test",
			content: "test",
			published: true,
			eventId: events?.[0].id,
		},
		resolver: zodResolver(
			EventPostSchema.omit({
				id: true,
				createdAt: true,
				updatedAt: true,
				authorId: true,
			})
		),
	});

	const onSubmitHandler = handleSubmit(async (data) => {
		console.log(data);
		const res = await patchPostEvent("1", data);
	});

	useEffect(() => {}, [
		getMenyEvents()
			.then((data) => {
				if (data.error) throw new Error(data.error.customError);
				setEvents(data.data);
			})
			.catch((error: any) => {
				console.error(error);
			}),
	]);

	return (
		<>
			<form onSubmit={onSubmitHandler}>
				<Controller
					control={control}
					name="title"
					render={({ field, fieldState: { error } }) => {
						return <Input {...field} />;
					}}
				/>
				<Controller
					control={control}
					name="eventId"
					render={({ field, fieldState: { error } }) => {
						return (
							<select {...field}>
								{events ? (
									events.map((event) => (
										<option key={event.id} value={event.id}>
											{event.title}
										</option>
									))
								) : (
									<option disabled>No event</option>
								)}
							</select>
						);
					}}
				/>
				<Controller
					control={control}
					name="published"
					render={({ field, fieldState: { error } }) => {
						return (
							<Input
								checked={field.value}
								type="checkbox"
								onChange={(e) => field.onChange(e.target.checked)}
								onBlur={field.onBlur}
							/>
						);
					}}
				/>
				<Controller
					control={control}
					name="content"
					render={({ field, fieldState: { error } }) => {
						return <Input {...field} />;
					}}
				/>
				<Button type="submit">Post Event</Button>
			</form>
		</>
	);
};
